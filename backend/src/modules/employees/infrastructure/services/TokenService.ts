import crypto from "node:crypto";
import { ITokenService } from "../../application/ports/ITokenService";

export class TokenService implements ITokenService {
  generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  hashToken(token: string): string {
    return crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  }
}