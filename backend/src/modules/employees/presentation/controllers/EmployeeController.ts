import type { Request, Response, NextFunction } from "express";
import { sendError, sendSuccess } from "../../../../presentation/response/ResponseHelper";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { IEmployeeUseCaseFactory } from "../../application/abstarction/IEmployeeUseCaseFactory";
import { VarifyEmployeeInvitation } from "../../application/usecases/VarifyEmployeeInvitation";
import { AcceptEmployeeInvitation } from "../../application/usecases/AcceptEmployeeInvitation";
import { acceptInvitationSchema } from "../../infrastructure/validator/acceptInvitationSchema";
import { IResendEmployeeInvitation } from "../../application/abstarction/IResendEmployeeInvitation";
import { EmployeeStatus } from "../../domain/entities/employee";
import { UpdateEmployeeDTO } from "../../application/dtos/EmployeesDtos";
import { MESSAGES } from "../../../../shared/constants/messages";





export class EmployeeController {
  constructor(
    private readonly employeeUseCaseFactory: IEmployeeUseCaseFactory,
      private readonly verifyEmployeeInvitation: VarifyEmployeeInvitation,
    private readonly acceptEmployeeInvitation: AcceptEmployeeInvitation,
      private readonly resendEmployeeInvitation:IResendEmployeeInvitation,
  
 

  
    ) {}

  async createEmployee(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const accountId = req.user!.accountId;

      const useCases =
        await this.employeeUseCaseFactory.createForAccount(accountId);

      if (!useCases) {
     sendError(
          res,
          "Company not found",
          HttpStatusCode.BAD_REQUEST,
        );
        return;
      }

      const result = await useCases.createEmployee.execute(
        req.body,
       accountId 
      );

   sendSuccess(
        res,
        "Employee created successfully",
        result,
        HttpStatusCode.OK,
      );
    } catch (error) {
      next(error);
    }
  }


async getAllEmployees(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user!.accountId;

  const useCases =
    await this.employeeUseCaseFactory.createForAccount(accountId);

  if (!useCases) {
    sendError(
      res,
      "Company not found",
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = String(req.query.search ?? "").trim();
  const departmentId = req.query.departmentId
    ? String(req.query.departmentId)
    : undefined;

     const categoryId = req.query.categoryId
    ? String(req.query.categoryId)
    : undefined;

const excludeCategoryId = req.query.excludeCategoryId
  ? String(req.query.excludeCategoryId)
  : undefined;
  const result = await useCases.getAllEmployees.execute(
    page,
    limit,
    search,
    departmentId,
    categoryId,
    excludeCategoryId
  );

  sendSuccess(
    res,
    "Employees fetched successfully",
    result,
    HttpStatusCode.OK,
  );
}


async verifyInvitation(req: Request, res: Response) {
  const { token } = req.body;

  const result = await this.verifyEmployeeInvitation.execute(token);

sendSuccess(
    res,
    "Invitation verified successfully",
    result,
    HttpStatusCode.OK
  );
}

async acceptInvitation(req: Request, res: Response): Promise<void> {
  
  
  const validatedData = acceptInvitationSchema.parse(req.body);
console.log("validatedData",validatedData)
  await this.acceptEmployeeInvitation.execute(validatedData);

  sendSuccess(
    res,
    "Invitation accepted successfully",
    null,
    HttpStatusCode.OK
  );
}
async resendInvitation(req: Request, res: Response): Promise<void> {
  const invitedByAccountId  = req.body.accountId;
   const accountId = req.user!.accountId;

  await this.resendEmployeeInvitation.execute(accountId,invitedByAccountId);

  sendSuccess(
    res,
    "Invitation resent successfully",
    null,
    HttpStatusCode.OK,
  );
}


async getEmployeeById(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user!.accountId;
  const employeeId = req.params.employeeId;

  if (typeof employeeId !== "string" || !employeeId.trim()) {
    sendError(
      res,
      MESSAGES.EMPLOYEE_NOT_FOUND,
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const useCases =
    await this.employeeUseCaseFactory.createForAccount(accountId);

  if (!useCases) {
    sendError(
      res,
      "Company not found",
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const result = await useCases.getEmployeeById.execute(employeeId);
console.log("getEmployeeById",result)
  sendSuccess(
    res,
    "Employee fetched successfully",
    result,
    HttpStatusCode.OK,
  );
}

async updateEmployee(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user!.accountId;
    const employeeId = req.params.employeeId;

    console.log("upateeeeeeeee",employeeId)

  if (typeof employeeId !== "string" || !employeeId.trim()) {
    sendError(
      res,
      MESSAGES.EMPLOYEE_NOT_FOUND,
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const useCases =
    await this.employeeUseCaseFactory.createForAccount(accountId);

  if (!useCases) {
    sendError(res, "Company not found", HttpStatusCode.BAD_REQUEST);
    return;
  }

  const result = await useCases.updateEmployee.execute(
  employeeId,
    req.body as UpdateEmployeeDTO,
  );

  sendSuccess(
    res,
    "Employee updated successfully",
    result,
    HttpStatusCode.OK,
  );
}

async updateEmployeeStatus(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user!.accountId;
    const employeeId = req.params.employeeId;

  if (typeof employeeId !== "string" || !employeeId.trim()) {
    sendError(
      res,
      MESSAGES.EMPLOYEE_NOT_FOUND,
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }
  const useCases =
    await this.employeeUseCaseFactory.createForAccount(accountId);

  if (!useCases) {
    sendError(res, "Company not found", HttpStatusCode.BAD_REQUEST);
    return;
  }

  const status = req.body.status as EmployeeStatus;

  if (!Object.values(EmployeeStatus).includes(status)) {
    sendError(
      res,
      "Invalid employee status",
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  await useCases.updateEmployeeStatus.execute(
    employeeId,
    status,
  );

  sendSuccess(
    res,
    "Employee status updated successfully",
    null,
    HttpStatusCode.OK,
  );
}

 async getUnassignedEmployees(
  req: Request,
  res: Response
): Promise<void> {
  const accountId = req.user!.accountId;
  const { categoryId } = req.params;

  console.log("eeeeeeeeeeeeeeeeeeeee")

  if (typeof categoryId !== "string" || !categoryId.trim()) {
    sendError(
      res,
      MESSAGES.CATEGORY_NOT_FOUND,
      HttpStatusCode.BAD_REQUEST
    );
    return;
  }

  const useCases =
    await this.employeeUseCaseFactory.createForAccount(accountId);

  if (!useCases) {
    sendError(
      res,
      "Company not found",
      HttpStatusCode.BAD_REQUEST
    );
    return;
  }

  const employees =
    await useCases.getUnassignedEmployeesForCategory.execute(categoryId);

  sendSuccess(
    res,
    "Unassigned employees fetched successfully",
    employees,
    HttpStatusCode.OK
  );
}

}


