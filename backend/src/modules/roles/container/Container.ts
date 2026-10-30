import { RoleController } from "../presentation/controllers/RoleController";
import { RoleUseCaseFactory } from "./RoleUseCaseFactory";

export const roleUseCaseFactory = new RoleUseCaseFactory();

export const roleController=new RoleController(
   roleUseCaseFactory 
)