import { Request, Response } from "express";

import { ApproveCompanyRequest } from "../../application/usecases/ApproveCompanyRequest";
import { CompleteCompanyRegistration } from "../../application/usecases/CompleteCompanyRegistration";
import { CreateCompanyRequest } from "../../application/usecases/CreateCompanyRequest";
import { GetCompanyRequest } from "../../application/usecases/GetCompanyRequest";
import { MoreInfoCompanyrequest } from "../../application/usecases/MoreInfoCompanyRequest";
import { RejectCompanyRequest } from "../../application/usecases/RejectCompanyRequest";
import { ResubmitCompanyRequest } from "../../application/usecases/ResubmitCompanyRequest";
import { UpdateCompanyDocuments } from "../../application/usecases/UpdateCompanyDocuments";
import { UpdateCompanyLocation } from "../../application/usecases/UpdateCompanyLocation";
import { UpdateCompanyRequest } from "../../application/usecases/UpdateCompanyRequest";
import { updateCompanyDocumentsSchema } from "../../application/Validators/UpdateCompanyDocumentSchema";
import { updateCompanyLocationSchema } from "../../application/Validators/UpdateCompanyLocationSchema";
import { updateCompanyRequestSchema } from "../../application/Validators/UpdateCompanyRequestSchema";
import { UpdateCompanyRequestData } from "../../domain/types/UpdateCompanyRequesstData";
import { CompanyType, EmployeeCountRange } from "../../domain/entities/CompanyRequest";
import { CompanyDocumentType } from "../../domain/Value-objects/CompanyDocuments";
import { CompanyDocumentFile } from "../../domain/types/CompanyDocumentFile";
export class CompanyRequestController {
  constructor(
      private readonly createCompanyRequest: CreateCompanyRequest,

    private readonly approveCompanyRequest: ApproveCompanyRequest,
  private readonly rejectCompanyRequest: RejectCompanyRequest,
    private readonly requestMoreInfo: MoreInfoCompanyrequest,
  private readonly resubmitCompanyRequest: ResubmitCompanyRequest,
  private readonly updateCompanyRequest: UpdateCompanyRequest,
  private readonly updateCompanyLocation:UpdateCompanyLocation,
private readonly updateCompanyDocuments: UpdateCompanyDocuments,
private readonly getCompanyRequest: GetCompanyRequest,
private readonly completeCompanyRegistration:CompleteCompanyRegistration

) {}

async create(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const companyRequest =
      await this.createCompanyRequest.execute(req.body);
console.log("company data:",companyRequest)
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
async updateDocuments(
  req: Request,
  res: Response
): Promise<void> {
  const { companyRequestId } = req.params;

  //  if (typeof companyRequestId !== "string") {
  //   res.status(400).json({
  //     success: false,
  //     message: "Invalid company request id",
  //   });
  //   return;
  // }
  if (!companyRequestId||  Array.isArray(companyRequestId)) {
    res.status(400).json({
      success: false,
      message: "Invalid company request id",
    });
    return;
  }

  try {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    console.log("Uploaded files:", files);

    const registrationCertificate =
      files.registrationCertificate?.[0];

    const taxDocument =
      files.taxDocument?.[0];

    const businessLicense =
      files.businessLicense?.[0];

    if (
      !registrationCertificate ||
      !taxDocument ||
      !businessLicense
    ) {
      res.status(400).json({
        success: false,
        message: "All company documents are required",
      });
      return;
    }

    console.log("Registration:", registrationCertificate.originalname);
    console.log("Tax:", taxDocument.originalname);
    console.log("License:", businessLicense.originalname);
const documents: CompanyDocumentFile[] = [
  {
    documentType: CompanyDocumentType.REGISTRATION_CERTIFICATE,
    file: registrationCertificate.buffer,
    fileName: registrationCertificate.originalname,
    mimeType: registrationCertificate.mimetype,
  },
  {
    documentType: CompanyDocumentType.TAX_DOCUMENT,
    file: taxDocument.buffer,
    fileName: taxDocument.originalname,
    mimeType: taxDocument.mimetype,
  },
  {
    documentType: CompanyDocumentType.BUSINESS_LICENSE,
    file: businessLicense.buffer,
    fileName: businessLicense.originalname,
    mimeType: businessLicense.mimetype,
  },
];

console.log("Documents:", documents);
  const companyRequest =
  await this.updateCompanyDocuments.execute(
    companyRequestId,
    documents
  );  
    


  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update company documents",
    });
  }
}
async updateLocation(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
    console.log("1 PARAMS:", id);
  console.log("2 BODY:", req.body);

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company request id",
    });
    return;
  }

  try {

const validatedData =
  updateCompanyLocationSchema.parse(req.body);


    const companyRequest =
      await this.updateCompanyLocation.execute(
        id,
        validatedData
      );

    res.status(200).json({
      success: true,
      message: "Company location updated successfully",
      data: companyRequest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update company location",
    });
  }
}
// async updateDocuments(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const { id } = req.params;

//   if (typeof id !== "string") {
//     res.status(400).json({
//       success: false,
//       message: "Invalid company request id",
//     });
//     return;
//   }

//   try {
//     const validatedData =
//       updateCompanyDocumentsSchema.parse(req.body);

//     const companyRequest =
//       await this.updateCompanyDocuments.execute(
//         id,
//         validatedData.documents
//       );

//     res.status(200).json({
//       success: true,
//       message: "Company documents updated successfully",
//       data: companyRequest,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message:
//         error instanceof Error
//           ? error.message
//           : "Failed to update company documents",
//     });
//   }
// }


async getById(
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
      await this.getCompanyRequest.execute(id);

    res.status(200).json({
      success: true,
      message: "Company request fetched successfully",
      data: companyRequest,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch company request",
    });
  }
}

async submit(
  req: Request,
  res: Response
): Promise<void> {
  const { accountId } = req.body;

  if (typeof accountId !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid account id",
    });
    return;
  }

  try {
    await this.completeCompanyRegistration.execute(
      accountId
    );

    res.status(200).json({
      success: true,
      message: "Company registration submitted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to submit company registration",
    });
  }
}
async getCompanyTypes(req:Request,res:Response):Promise<void>
{ res.status(200).json({
    success: true,
    data: Object.values(CompanyType),
  });



}

async getEmployeeRange(req:Request,res:Response):Promise<void>{
  res.status(200).json({
    success:true,
    data:Object.values(EmployeeCountRange)
  })
}
}