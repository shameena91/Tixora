import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import { ICompanyRepository } from "../../../../company/domain/repositories/ICompanyRepository";
import { IFileStoragePort } from "../../../../company/application/ports/IFileStoragePort";

import { PaymentMethod } from "../../../../payments/domain/entities/Payment";
import { IPaymentRepository } from "../../../../payments/domain/repositories/IPaymentRepository";
import { PaymentStatus } from "../../../../payments/domain/types/PaymentStatus";

import { IProvisionTenant } from "../../../../tenant/application/abstractions/IProvisionTenant";

import {
  BillingCycle,
  Subscription,
  SubscriptionStatus,
} from "../../../domain/entities/Subscription";

import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";

import { IVerifySubscriptionPayment } from "../../abstraction/company-subscription/IVerifySubscriptionPayment";
import { VerifySubscriptionPaymentResponseDto } from "../../dto/VerifySubscriptionPaymentResponseDto";
import { IRazorpayOrderService } from "../../ports/IRazorpayOrderService";

import { ICreateInvoiceUseCase } from "../../../../invoice/application/abstraction/ICreateInvoiceUseCase";
import { IInvoiceRepository } from "../../../../invoice/domain/repositories/IInvoiceRepository";
import { IInvoicePdfGenerator } from "../../../../invoice/application/ports/IInvoicePdfGenerator";
import { CreateInvoiceDto } from "../../../../invoice/application/Dtos/CreateInvoiceDto";

import { generateInvoiceNumber } from "../../../../../shared/utills/generateInvoiceId";

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function calculateEndDate(
  startDate: Date,
  billingCycle: BillingCycle,
): Date {
  const monthOffset =
    billingCycle === BillingCycle.MONTHLY ? 1 : 12;

  const targetMonthIndex =
    startDate.getMonth() + monthOffset;

  const targetYear =
    startDate.getFullYear() +
    Math.floor(targetMonthIndex / 12);

  const targetMonth = targetMonthIndex % 12;
  const originalDay = startDate.getDate();

  const endDate = new Date(startDate);

  // Prevent dates such as January 31 overflowing into March.
  endDate.setDate(1);
  endDate.setFullYear(targetYear, targetMonth, 1);

  const lastDayOfTargetMonth = new Date(
    targetYear,
    targetMonth + 1,
    0,
  ).getDate();

  endDate.setDate(
    Math.min(originalDay, lastDayOfTargetMonth),
  );

  return endDate;
}

function resolvePaymentMethod(
  method: string,
): PaymentMethod | null {
  const paymentMethodMap: Record<string, PaymentMethod> = {
    card: PaymentMethod.CARD,
    netbanking: PaymentMethod.NETBANKING,
    wallet: PaymentMethod.WALLET,
  };

  return paymentMethodMap[method] ?? null;
}

export class VerifySubscriptionPayment
  implements IVerifySubscriptionPayment
{
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _companyRepository: ICompanyRepository,
    private readonly _razorpayOrderService: IRazorpayOrderService,
    private readonly _paymentRepository: IPaymentRepository,
    private readonly _provisionTenant: IProvisionTenant,
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
    private readonly _createInvoice: ICreateInvoiceUseCase,
    private readonly _invoiceRepository: IInvoiceRepository,
    private readonly _invoicePdfGenerator: IInvoicePdfGenerator,
    private readonly _fileStorage: IFileStoragePort,
  ) {}

  async execute(
    accountId: string,
    orderId: string,
    paymentId: string,
    signature: string,
  ): Promise<VerifySubscriptionPaymentResponseDto> {
   

    const isValid =
      this._razorpayOrderService.verifyPayment(
        orderId,
        paymentId,
        signature,
      );

    if (!isValid) {
      throw new AppErrors(
        MESSAGES.INVALID_PAYMENT_SIGNATURE,
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

   

    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }

  

    const razorpayOrder =
      await this._razorpayOrderService.getOrder(orderId);

    if (razorpayOrder.notes.companyId !== company.id) {
      throw new AppErrors(
        MESSAGES.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }


    const payment =
      await this._paymentRepository.findByRazorpayOrderId(
        orderId,
      );

    if (!payment) {
      throw new AppErrors(
        MESSAGES.PAYMENT_NOT_FOUND,
        ErrorCode.PAYMENT_NOT_FOUND,
      );
    }

    if (payment.companyId !== company.id) {
      throw new AppErrors(
        MESSAGES.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }

    const paymentAlreadySucceeded =
      payment.status === PaymentStatus.SUCCESS;

    if (
      paymentAlreadySucceeded &&
      payment.razorpayPaymentId !== paymentId
    ) {
      throw new AppErrors(
        MESSAGES.INVALID_PAYMENT_SIGNATURE,
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

    if (
      paymentAlreadySucceeded &&
      !payment.subscriptionId
    ) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }

 

    const paymentDetails =
      await this._razorpayOrderService.getPaymentDetails(
        paymentId,
      );

    if (paymentDetails.orderId !== orderId) {
      throw new AppErrors(
        MESSAGES.INVALID_PAYMENT_SIGNATURE,
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

  



    const planId = razorpayOrder.notes.planId;

    if (!planId) {
      throw new AppErrors(
        MESSAGES.INVALID_PAYMENT_SIGNATURE,
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

    const rawBillingCycle =
      razorpayOrder.notes.billingCycle;

    const billingCycle =
      rawBillingCycle === BillingCycle.MONTHLY
        ? BillingCycle.MONTHLY
        : rawBillingCycle === BillingCycle.YEARLY
          ? BillingCycle.YEARLY
          : null;

    if (!billingCycle) {
      throw new AppErrors(
        MESSAGES.INVALID_PAYMENT_SIGNATURE,
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

    const isRenewal =
      String(razorpayOrder.notes.isRenewal) === "true";

    const isUpgrade =
      String(razorpayOrder.notes.isUpgrade) === "true";

    if (isRenewal && isUpgrade) {
      throw new AppErrors(
        "A payment cannot be both a renewal and an upgrade.",
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

    if (
      payment.planId !== planId ||
      payment.billingCycle !== billingCycle
    ) {
      throw new AppErrors(
        MESSAGES.INVALID_PAYMENT_SIGNATURE,
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }


    const selectedPlan =
      await this._subscriptionPlanRepository.findById(
        planId,
      );

    if (!selectedPlan) {
      throw new AppErrors(
        MESSAGES.PLAN_NOT_FOUND,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }

    if (
      selectedPlan.subscriptionPlanStatus !== "ACTIVE" &&
      !paymentAlreadySucceeded
    ) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_ACTIVE,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_ACTIVE,
      );
    }

    const paymentDate = paymentDetails.createdAt;



    let updatedSubscription: Subscription | null

    if (paymentAlreadySucceeded) {
     
      updatedSubscription =
        await this._subscriptionRepository.findById(
          payment.subscriptionId!,
        );

      if (
        !updatedSubscription ||
        updatedSubscription.companyId !== company.id ||
        updatedSubscription.planId !== planId ||
        updatedSubscription.billingCycle !== billingCycle
      ) {
        throw new AppErrors(
          MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
          ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
        );
      }
    } else {
    
      updatedSubscription =
        await this._subscriptionRepository.findByRazorpayOrderId(
          orderId,
        );

      if (
        updatedSubscription &&
        (
          updatedSubscription.companyId !== company.id ||
          updatedSubscription.planId !== planId ||
          updatedSubscription.billingCycle !== billingCycle
        )
      ) {
        throw new AppErrors(
          MESSAGES.INVALID_PAYMENT_SIGNATURE,
          ErrorCode.INVALID_PAYMENT_SIGNATURE,
        );
      }


      if (isRenewal) {
        const subscriptionId =
          razorpayOrder.notes.subscriptionId;

        if (!subscriptionId) {
          throw new AppErrors(
            MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
            ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
          );
        }

        const existingSubscription =
          await this._subscriptionRepository.findById(
            subscriptionId,
          );

        if (
          !existingSubscription ||
          existingSubscription.companyId !== company.id ||
          existingSubscription.planId !== planId ||
          existingSubscription.billingCycle !== billingCycle
        ) {
          throw new AppErrors(
            MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
            ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
          );
        }

        if (
          existingSubscription.status !== SubscriptionStatus.ACTIVE &&
          existingSubscription.status !== SubscriptionStatus.EXPIRED
        ) {
          throw new AppErrors(
            MESSAGES.ALL_REDY_SUBSCRIBED,
            ErrorCode.All_READY_SUBSCRIBED,
          );
        }

        if (
          updatedSubscription?.id === existingSubscription.id
        ) {
          await this._subscriptionRepository.updateSubscription(
            existingSubscription.id,
            {
              razorpayOrderId: null,
            },
          );

          updatedSubscription = null;
        }

        const hasRemainingTime =
          existingSubscription.status === SubscriptionStatus.ACTIVE &&
          existingSubscription.endDate !== null &&
          existingSubscription.endDate.getTime() >
            paymentDate.getTime();

        const renewalStartDate = hasRemainingTime
          ? existingSubscription.endDate!
          : paymentDate;

        if (!updatedSubscription) {
  const newSubscription = new Subscription(
    crypto.randomUUID(),
    company.id,
    planId,
    orderId,
    billingCycle,
    hasRemainingTime
      ? SubscriptionStatus.SCHEDULED
      : SubscriptionStatus.ACTIVE,
    renewalStartDate,
    calculateEndDate(
      renewalStartDate,
      billingCycle,
    ),
    paymentDate,
    paymentDate,
  );

  updatedSubscription =
    await this._subscriptionRepository.create(
      newSubscription,
    );
}
        if (
          !hasRemainingTime &&
          existingSubscription.status === SubscriptionStatus.ACTIVE
        ) {
          await this._subscriptionRepository.updateSubscription(
            existingSubscription.id,
            {
              status: SubscriptionStatus.EXPIRED,
            },
          );
        }
      }


      else if (isUpgrade) {
        const subscriptionId =
          razorpayOrder.notes.subscriptionId;

        if (!subscriptionId) {
          throw new AppErrors(
            MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
            ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
          );
        }

        const existingSubscription =
          await this._subscriptionRepository.findById(
            subscriptionId,
          );

        if (
          !existingSubscription ||
          existingSubscription.companyId !== company.id
        ) {
          throw new AppErrors(
            MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
            ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
          );
        }

   
        if (
          updatedSubscription?.id === existingSubscription.id
        ) {
          await this._subscriptionRepository.updateSubscription(
            existingSubscription.id,
            {
              razorpayOrderId: null,
            },
          );

          updatedSubscription = null;
        }

        const isRetryOfUpgrade =
          existingSubscription.status ===
            SubscriptionStatus.UPGRADED &&
          updatedSubscription !== null &&
          updatedSubscription.id !== existingSubscription.id;

        if (
          existingSubscription.status !==
            SubscriptionStatus.ACTIVE &&
          !isRetryOfUpgrade
        ) {
          throw new AppErrors(
            MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
            ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
          );
        }

        if (existingSubscription.planId === planId) {
          throw new AppErrors(
            "The selected plan is already the current plan.",
            ErrorCode.All_READY_SUBSCRIBED,
          );
        }

        const currentPlan =
          await this._subscriptionPlanRepository.findById(
            existingSubscription.planId,
          );

        if (!currentPlan) {
          throw new AppErrors(
            MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
            ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
          );
        }

        const currentPrice =
          billingCycle === BillingCycle.MONTHLY
            ? currentPlan.monthlyPrice
            : currentPlan.yearlyPrice;

        const selectedPrice =
          billingCycle === BillingCycle.MONTHLY
            ? selectedPlan.monthlyPrice
            : selectedPlan.yearlyPrice;

        if (
          !Number.isFinite(currentPrice) ||
          !Number.isFinite(selectedPrice) ||
          selectedPrice <= currentPrice
        ) {
          throw new AppErrors(
            "Please select a plan with a higher price than your current plan.",
            ErrorCode.All_READY_SUBSCRIBED,
          );
        }

      if (!updatedSubscription) {
  const newSubscription = new Subscription(
    crypto.randomUUID(),
    company.id,
    planId,
    orderId,
    billingCycle,
    SubscriptionStatus.ACTIVE,
    paymentDate,
    calculateEndDate(paymentDate, billingCycle),
    paymentDate,
    paymentDate,
  );

  updatedSubscription =
    await this._subscriptionRepository.create(
      newSubscription,
    );
}

        if (
          existingSubscription.status ===
          SubscriptionStatus.ACTIVE
        ) {
          await this._subscriptionRepository.updateSubscription(
            existingSubscription.id,
            {
              status: SubscriptionStatus.UPGRADED,
              endDate: paymentDate,
            },
          );
        }
      }

  

      if (!updatedSubscription) {
  const newSubscription = new Subscription(
    crypto.randomUUID(),
    company.id,
    planId,
    orderId,
    billingCycle,
    SubscriptionStatus.ACTIVE,
    paymentDate,
    calculateEndDate(paymentDate, billingCycle),
    paymentDate,
    paymentDate,
  );

  updatedSubscription =
    await this._subscriptionRepository.create(
      newSubscription,
    );
}
    }

    if (!updatedSubscription) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }


    if (!paymentAlreadySucceeded) {
      await this._paymentRepository.updatePaymentStatus(
        payment.id,
        PaymentStatus.SUCCESS,
        updatedSubscription.id,
        paymentId,
        paymentDate,
        resolvePaymentMethod(
          paymentDetails.paymentMethod,
        ),
      );
    }

    if (!isRenewal && !isUpgrade) {
      await this._provisionTenant.execute(
        company.id,
        company.companyName,
      );
    }

  

    const existingInvoice =
      await this._invoiceRepository.findByPaymentId(
        paymentId,
      );

    if (!existingInvoice) {
      const companyAddress = company.location
        ? [
            company.location.address,
            company.location.city,
            company.location.state,
            company.location.country,
            company.location.postalCode,
          ]
            .filter(Boolean)
            .join(", ")
        : "";

      const invoiceNumber = await generateInvoiceNumber();

      const invoiceDto: CreateInvoiceDto = {
        invoiceNumber,
        companyId: company.id,
        paymentId,
        subscriptionId: updatedSubscription.id,
        companyName: company.companyName,
        companyEmail: company.companyEmail,
        companyPhone: company.phone,
        companyRegistrationNumber: company.registrationNumber,
        companyAddress,
        planName: selectedPlan.name,
        billingCycle: updatedSubscription.billingCycle,
        amount: payment.amount,
        currency: "INR",
        pdfKey: null,
        paymentDate,
        paymentMethod: resolvePaymentMethod(
          paymentDetails.paymentMethod,
        ),
        paymentStatus: "SUCCESS",
      };

      const createdInvoice =
        await this._createInvoice.execute(invoiceDto);

      const pdfBuffer =
        await this._invoicePdfGenerator.generate(
          invoiceDto,
        );

      const uploadedPdf =
        await this._fileStorage.upload(
          pdfBuffer,
          `${invoiceDto.invoiceNumber}.pdf`,
          "application/pdf",
          "invoices",
        );

      await this._invoiceRepository.updatePdfKey(
        createdInvoice.id,
        uploadedPdf.key,
      );
    }

    

    return {
      subscriptionId: updatedSubscription.id,
      orderId,
      billingCycle: updatedSubscription.billingCycle,
      status: updatedSubscription.status,
      startDate: updatedSubscription.startDate,
      endDate: updatedSubscription.endDate,
    };
  }
}