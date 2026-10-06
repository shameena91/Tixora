import { AccountStatus } from "../../../auth/domain/entities/Account";

export interface GetAdminListDto{
        id: string;
   
      firstName: string;
    lastName: string;
      email: string;
      phone:string
      status: AccountStatus
      designation:string
     
}