import bcrypt from "bcrypt";
import { IPasswordHasher } from "../../application/ports/IPasswordHasher";

export class BcryptpasswordHasher implements IPasswordHasher{
    async compare(plainPassword: string, passwordHash: string): Promise<boolean> {
       return bcrypt.compare(plainPassword, passwordHash); 
    }

}