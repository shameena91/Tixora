

import type { NextFunction, Request, Response } from "express";
import type { ITokenService } from "../../application/ports/ITokenServices";

export class AuthMiddleware {
  constructor(
    private readonly _tokenService: ITokenService,
  ) {}

  authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Access token is required or invalid",
      });
      return;
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      res.status(401).json({
        message: "Invalid authorization header",
      });
      return;
    }

    let payload: ReturnType<ITokenService["verifyAccessToken"]>;

    try {
      payload = this._tokenService.verifyAccessToken(token);
    } catch {
      res.status(401).json({
        message: "Invalid or expired access token",
      });
      return;
    }


    if (
      typeof payload !== "object" ||
      payload === null ||
      !("accountId" in payload) ||
      typeof payload.accountId !== "string" ||
      !payload.accountId.trim()
    ) {
      res.status(401).json({
        message: "Authenticated account ID is missing or invalid",
      });
      return;
    }


    req.user = payload;

    next();
  }
}