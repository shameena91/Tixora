import { Request, Response } from "express";


import { GetCompanies } from "../../application/usecases/company/GetCompanies";
import { GetCompanyDetails } from "../../application/usecases/company/GetCompanyDetails";
import { IGetCompanyDetails } from "../../application/abstraction/IgetCompanyDetails";
import { IGetCompanies } from "../../application/abstraction/IGetCompanies";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

export class CompanyController{
    constructor(
        private readonly _getCompanies:IGetCompanies,
        private readonly _getCompanyDetails:IGetCompanyDetails
    ){}
    

   async getAllCompanies(
        req:Request,
        res:Response
    ):Promise<void>
    {

        const search =
    typeof req.query.search === "string"
      ? req.query.search.trim()
      : undefined;

      const companies =
      await this._getCompanies.execute(search);
console.log("searched companu",companies)
    res.status(200).json({
      success: true,
      data: companies,
    });
  }

  async GetCompany(
    req:Request,
    res:Response
  ):Promise<void>
  {
console.log("GetCompany")
    const {id}=req.params
      console.log("contrp",id)
      if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
    console.log("contrp",id)
    const companies=await this._getCompanyDetails.execute(id)
console.log("contrp",companies)
     res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Company Data fetched",
      data: companies,
    });
  }
}
 
