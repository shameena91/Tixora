import bcrypt from "bcrypt";
import { IPasswordHasher } from "../../application/ports/IPasswordHasher";

export class BcryptpasswordHasher implements IPasswordHasher{

    async hash(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
    async compare(plainPassword: string, passwordHash: string)
    : Promise<boolean> {
       return bcrypt.compare(plainPassword, passwordHash); 
    }

}