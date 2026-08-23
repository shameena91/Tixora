import { env } from "../../../../config/env";
import jwt from "jsonwebtoken";
import { ITokenService } from "../../application/ports/ITokenServices";
export class JwtTokenService implements ITokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = env.jwtAccessToken;
  this.refreshTokenSecret = env.jwtRefreshToken;


  
  }

  generateAccessToken(payload: {
    accountId: string;
    email: string;
  }): string {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: "15m",
    });
  }

  generateRefreshToken(payload: {
    accountId: string;
  }): string {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: "7d",
    });
  }
  verifyAccessToken(token: string): { accountId: string; email: string; } {
      const decoded= jwt.verify(token,this.accessTokenSecret)
      return decoded as{
        accountId:string,
        email:string
      }
  }
  verifyRefreshToken(token: string): { accountId: string; } {
      const decoded=jwt.verify(token,this.refreshTokenSecret)
       return decoded as {
    accountId: string;
  };
  }
}