import { CreatePaymentRequestDto, CreatePaymentResponseDto } from "../dto/CreatePaymentDto";

export interface ICreatePayment {
  execute(
    data: CreatePaymentRequestDto,
  ): Promise<CreatePaymentResponseDto>;
}