import { NextFunction ,Request,Response} from "express";
import { ITokenService } from "../../application/ports/ITokenServices";

export class AuthMiddleware{
    constructor(
        private readonly tokenService:ITokenService
    ){}

    authenticate(req:Request,res:Response,next:NextFunction){
        try {
             const authHeader = req.headers.authorization;

             if(!authHeader){
                 return res.status(401).json({
          message: "Access token is required",
        });
             }

          const token = authHeader.split(" ")[1];
             if (!token) {
        return res.status(401).json({
          message: "Invalid authorization header",
        });
    }
         const payload = this.tokenService.verifyAccessToken(token);
           req.user = payload;
            next() 
      }  
      

         catch (error) {
             return res.status(401).json({
        message: "Invalid or expired access token",
      });
        }
    
}
}