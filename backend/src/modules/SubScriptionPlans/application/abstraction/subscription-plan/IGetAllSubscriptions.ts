
// import {SubScriptionListItems} from "../dto/SubScriptionListItems"

// export interface IGetAllSubscriptions{
//     execute():Promise<SubScriptionListItems[]>
// }


import { AccountRole } from "../../../../auth/domain/entities/Account";
import { SubScriptionListItems } from "../../dto/SubScriptionListItems";

export interface IGetAllSubscriptions {
  execute(
    role: AccountRole
  ): Promise<SubScriptionListItems[]>;
}