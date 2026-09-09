import { env } from "../../../../config/env";
import jwt from "jsonwebtoken";
import { ITokenService } from "../../application/ports/ITokenServices";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { MESSAGES } from "../../../../shared/constants/messages";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
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
  verifyRefreshToken(
  token: string
): { accountId: string } {

  try {
    const decoded = jwt.verify(
      token,
      this.refreshTokenSecret
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