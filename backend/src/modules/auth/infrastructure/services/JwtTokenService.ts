import { env } from "../../../../config/env";
import jwt from "jsonwebtoken";
import { ITokenService } from "../../application/ports/ITokenServices";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { MESSAGES } from "../../../../shared/constants/messages";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { AccountRole } from "../../domain/entities/Account";
export class JwtTokenService implements ITokenService {
  private readonly _accessTokenSecret: string;
  private readonly _refreshTokenSecret: string;

  constructor() {
    this._accessTokenSecret = env.jwtAccessToken;
  this._refreshTokenSecret = env.jwtRefreshToken;


  
  }

  generateAccessToken(payload: {
    accountId: string;
    email: string;
      role: AccountRole;
  }): string {
    return jwt.sign(payload, this._accessTokenSecret, {
      expiresIn: "15m",
    });
  }

  generateRefreshToken(payload: {
    accountId: string;
  }): string {
    return jwt.sign(payload, this._refreshTokenSecret, {
      expiresIn: "7d",
    });
  }
  verifyAccessToken(token: string): { accountId: string; 
    email: string;
        role: AccountRole;
 } {
      const decoded= jwt.verify(token,this._accessTokenSecret)
      return decoded as{
        accountId:string,
        email:string,
           role: AccountRole; 
      }
  }
  verifyRefreshToken(
  token: string
): { accountId: string } {

  try {
    const decoded = jwt.verify(
      token,
      this._refreshTokenSecret
    );

    return decoded as {
      accountId: string;
    
    };

  } catch (error) {
    throw new AppErrors(
      MESSAGES.INVALID_REFRESH_TOKEN,
      HttpStatusCode.UNAUTHORIZED
    );
  }
}
}