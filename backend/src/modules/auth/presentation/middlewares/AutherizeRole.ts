import { NextFunction, Request, Response } from "express";
import { AccountRole } from "../../domain/entities/Account";

export const authorizeRoles = (...allowedRoles: AccountRole[]) => {


 
  return (req: Request, res: Response, next: NextFunction) => {
     console.log("USER IN AUTHORIZE ROLE:", req.user);
    
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};