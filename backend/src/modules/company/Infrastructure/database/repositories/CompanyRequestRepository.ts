import { CompanyRequest, CompanyRequestStatus } from "../../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { UpdateCompanyRequestData } from "../../../domain/types/UpdateCompanyRequesstData";
import { CompanyRequestDocument, CompanyRequestMapper } from "../mappers/CompanyRequestMappers";
import { CompanyRequestModel } from "../models/CompanyRequestModel";
// import { UpdateCompanyRequestDto } from "../../../application/Validators/updatecompanyrequestSchema";

;

export class CompanyRequestRepository implements ICompanyRequestRepository
{

async create(companyRequest:CompanyRequest):Promise<CompanyRequest>{
    
const persistanceData= CompanyRequestMapper.toPersistence(companyRequest)
const companyRequestDocument=await CompanyRequestModel.create(persistanceData)
return CompanyRequestMapper.toDomain(companyRequestDocument.toObject()  )

}
async findById(id:string):Promise<CompanyRequest|null>{
const companyRequestDocument=await CompanyRequestModel.findById(id)
.lean<CompanyRequestDocument>()

  if (!companyRequestDocument) {
    return null;
  }

  return CompanyRequestMapper.toDomain(companyRequestDocument);
}
async findByAccountId(accountId:string):Promise<CompanyRequest|null>{
const companyRequestDocument =
    await CompanyRequestModel
      .findOne({ accountId })
      .lean<CompanyRequestDocument>();

  if (!companyRequestDocument) {
    return null;
  }

  return CompanyRequestMapper.toDomain(companyRequestDocument);
}

async updateStatus(id: string, status: CompanyRequestStatus): Promise<CompanyRequest> 
    {
const companyRequestDocument=await CompanyRequestModel.findByIdAndUpdate(
  id,
  {
    status,
    updatedAt:new Date()
  },{
    new:true
  }
).lean<CompanyRequestDocument>()

if(!companyRequestDocument)
{
  throw new Error("company Request Not found")
}
return CompanyRequestMapper.toDomain(companyRequestDocument)
    }


    async updateInfo(id: string, data: UpdateCompanyRequestData): Promise<CompanyRequest> {
        const companyRequestDocument=await CompanyRequestModel.findByIdAndUpdate(id,
          {
            $set:data,
            updatedAt:new Date(),
          },{
            new:true
          }
        ).lean<CompanyRequestDocument>()
        if(!companyRequestDocument)
        {
          throw new Error("company Request Not found")
        }
        return CompanyRequestMapper.toDomain(companyRequestDocument)
    }
    

}