import { Types } from "mongoose";
import { Account ,AccountStatus,RegistrationStep} from "../../../domain/entities/Account";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { AccountModel } from "../models/AccountModel";

interface AccountDocument{
     _id: Types.ObjectId;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  designation?: string;
  passwordHash: string | null;
  status: AccountStatus;
  emailVerified: boolean;
  registrationStep: RegistrationStep;
  createdAt: Date;
  updatedAt: Date;
}


export class AccountRepository implements IAccountRepository{
async create(account:Account):Promise<Account>{
const accountDocument=await AccountModel.create({
  
    email:account.email,
    passwordHash:account.passwordHash,
    status:account.status,
    emailVerified:account.emailVerified,
    registrationStep:account.registrationStep,
     createdAt: account.createdAt,
    updatedAt: account.updatedAt,

})
  return this.toDomain(accountDocument.toObject() as AccountDocument);  

}
 
     async findByEmail(email: string): Promise<Account | null> {
    const accountDocument = await AccountModel.findOne({ email }).lean<AccountDocument>();

    if (!accountDocument) {
      return null;
    }

    return this.toDomain(accountDocument);
  }

  async findById(id: string): Promise<Account | null> {
    const accountDocument = await AccountModel.findById(id).lean<AccountDocument>();

    if (!accountDocument) {
      return null;
    }

    return this.toDomain(accountDocument);;
  } 

async updateAdminDetails(
  id: string,
  firstName: string,
  lastName: string,
  phone: string,
  designation: string
): Promise<Account> {
  const accountDocument = await AccountModel.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      phone,
      designation,
    },
    {
    returnDocument: "after",
  }
  ).lean<AccountDocument>();

  if (!accountDocument) {
    throw new Error("Account not found");
  }

  return this.toDomain(accountDocument);
}



  // async update(account:Account):Promise<Account>{
  //   const accountDocument=await AccountModel.findByIdAndUpdate(account.id,{
  //     email: account.email,
  //       firstName: account.firstName,
  //     lastName: account.lastName,
  //     phone: account.phone,
  //     designation: account.designation,
  //         passwordHash: account.passwordHash,
  //         status: account.status,
  //         emailVerified: account.emailVerified,
  //         registrationStep: account.registrationStep,
  //         updatedAt: account.updatedAt,  
  //   },{new:true}).lean<AccountDocument>()
  //   if(!accountDocument){
  //       throw new Error("Account not found")
  //   }
  //  return this.toDomain(accountDocument);;
  // }
   private toDomain(doc: AccountDocument): Account {
    return new Account(
      doc._id.toString(),
      doc.email,
    doc.firstName ?? "",
    doc.lastName ?? "",
    doc.phone ?? "",
    doc.designation ?? "",
      doc.passwordHash,
      doc.status,
      doc.emailVerified,
      doc.registrationStep,
      doc.createdAt,
      doc.updatedAt
    );
  }

}

