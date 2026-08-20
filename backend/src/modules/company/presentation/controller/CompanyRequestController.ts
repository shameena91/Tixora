import { Request, Response } from "express";

import { ApproveCompanyRequest } from "../../application/usecases/ApproveCompanyRequest";
import { RejectCompanyRequest } from "../../application/usecases/RejectCompanyRequest";
import { MoreInfoCompanyrequest } from "../../application/usecases/MoreInfoCompanyRequest";
import { ResubmitCompanyRequest } from "../../application/usecases/ResubmitCompanyRequest";
import { updateCompanyRequestSchema } from "../../application/Validators/UpdateCompanyRequestSchema"
import { UpdateCompanyRequest } from "../../application/usecases/UpdateCompanyRequest";
import { UpdateCompanyRequestData } from "../../domain/types/UpdateCompanyRequesstData";
import {CreateCompanyRequest} from "../../application/usecases/CreateCompanyRequest"
export class CompanyRequestController {
  constructor(
      private readonly createCompanyRequest: CreateCompanyRequest,

    private readonly approveCompanyRequest: ApproveCompanyRequest,
  private readonly rejectCompanyRequest: RejectCompanyRequest,
    private readonly requestMoreInfo: MoreInfoCompanyrequest,
  private readonly resubmitCompanyRequest: ResubmitCompanyRequest,
  private readonly updateCompanyRequest: UpdateCompanyRequest
) {}

async create(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const companyRequest =
      await this.createCompanyRequest.execute(req.body);

    res.status(201).json({
      success: true,
      message: "Company request created successfully",
      data: companyRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create company request",
    });
  }
}


async approve(
    req:Request,
    res:Response
):Promise<void>{
const { id }=req.params;
try {
     if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company request id",
    });
    return;
  }
   const companyRequest =
        await this.approveCompanyRequest.execute(id);
        res.status(200).json({
            success:true,
            message:"Company request Approved Successfully",
            data:companyRequest
        });  
} catch (error) {
     res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to approve company request",
      });
}
     

}
async reject(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company request id",
    });
    return;
  }

  try {
    const companyRequest =
      await this.rejectCompanyRequest.execute(id);

    res.status(200).json({
      success: true,
      message: "Company request rejected successfully",
      data: companyRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to reject company request",
    });
  }
}


async moreInfo(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company request id",
    });
    return;
  }

  try {
    const companyRequest =
      await this.requestMoreInfo.execute(id);

    res.status(200).json({
      success: true,
      message: "More information requested successfully",
      data: companyRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to request more information",
    });
  }
}


async resubmit(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company request id",
    });
    return;
  }

  try {
    const companyRequest =
      await this.resubmitCompanyRequest.execute(id);

    res.status(200).json({
      success: true,
      message: "Company request resubmitted successfully",
      data: companyRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to resubmit company request",
    });
  }
}

async update(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company request id",
    });
    return;
  }

  try {
const validatedData =
  updateCompanyRequestSchema.parse(req.body);

const updateData: UpdateCompanyRequestData = validatedData;

const companyRequest =
  await this.updateCompanyRequest.execute(
    id,
    updateData
  );

    res.status(200).json({
      success: true,
      message: "Company request updated successfully",
      data: companyRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update company request",
    });
  }
}

}