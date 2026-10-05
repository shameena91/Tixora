import { NextFunction, Request, Response } from "express";

import { env } from "../../../../config/env";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";

import { ILogin } from "../../application/abstractions/ILogin";
import { ISendRegistrationOtp } from "../../application/abstractions/ISendRegistrationOtp";
import { IVarifyOtp } from "../../application/abstractions/IVarifyOtp";
import { ICreatePassword } from "../../application/abstractions/ICreatepassword";
import { IResetPassword } from "../../application/abstractions/IResetPassword";
import { IForgotPassword } from "../../application/abstractions/IforgotPassword";
import { IRefreshAccessToken } from "../../application/abstractions/IRefreshAccessToken";
import { IAdminRegistration } from "../../application/abstractions/IAdminRegistration";

import { adminRegistrationSchema } from "../../application/validators/AdminRegistrationValidator";
import { sendError, sendSuccess } from "../../../../presentation/response/ResponseHelper";
import { ILogout } from "../../application/abstractions/ILogout";


export class AuthController {
  constructor(
    private readonly _login: ILogin,
    private readonly _sendOtp: ISendRegistrationOtp,
    private readonly _verifyOtp: IVarifyOtp,
    private readonly _createPassword: ICreatePassword,
    private readonly _forgotPassword: IForgotPassword,
    private readonly _resetPassword: IResetPassword,
    private readonly _refreshAccessToken: IRefreshAccessToken,
    private readonly _adminRegistration: IAdminRegistration,
    private readonly _logout: ILogout
  ) {}

  async loginRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this._login.execute(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: env.nodeEnv === "production",
        sameSite: "lax",
        maxAge: env.maxAge
      });
      const userName=`${result.account.firstName} ${result.account.lastName}`
console.log("mannn:",result.account.firstName)
      return sendSuccess(
        res,
        "Login successful",
        {
      name: userName,
      role:result.account.role,
          accessToken: result.accessToken,
        },
        HttpStatusCode.OK
      );
    } catch (error) {
      next(error);
    }
  }


  async sendOtpRequest(
    req: Request,
    res: Response
  ) {
    const { email } = req.body;

    await this._sendOtp.execute(email);

    return sendSuccess(
      res,
      "OTP sent successfully",
      undefined,
      HttpStatusCode.OK
    );
  }

  async verifyOtpRequest(
    req: Request,
    res: Response
  ) {
    const { email, otp, purpose } = req.body;

    const isValid = await this._verifyOtp.execute({
      email,
      otp,
      purpose,
    });

    if (!isValid) {
      return sendError(
        res,
        "Invalid or expired OTP",
        HttpStatusCode.BAD_REQUEST
      );
    }

    return sendSuccess(
      res,
      "OTP verified successfully",
      undefined,
      HttpStatusCode.OK
    );
  }


  async createPasswordRequest(
    req: Request,
    res: Response
  ) {
    await this._createPassword.execute({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    return sendSuccess(
      res,
      "Password created successfully",
      undefined,
      HttpStatusCode.OK
    );
  }


  async forgotPasswordRequest(
    req: Request,
    res: Response
  ) {
    await this._forgotPassword.execute(
      req.body.email
    );

    return sendSuccess(
      res,
      "OTP sent successfully",
      undefined,
      HttpStatusCode.OK
    );
  }


  async verifyResetOtpRequest(
    req: Request,
    res: Response
  ) {
    const isValid = await this._verifyOtp.execute({
      email: req.body.email,
      otp: req.body.otp,
      purpose: "forgot-password",
    });

    if (!isValid) {
      return sendError(
        res,
        "Invalid or expired OTP",
        HttpStatusCode.BAD_REQUEST
      );
    }

    return sendSuccess(
      res,
      "Password reset OTP verified successfully",
      undefined,
      HttpStatusCode.OK
    );
  }

  
  async resetPasswordRequest(
    req: Request,
    res: Response
  ) {
    await this._resetPassword.execute(
      req.body.email,
      req.body.password,
      req.body.confirmPassword
    );

    return sendSuccess(
      res,
      "Password reset successfully",
      undefined,
      HttpStatusCode.OK
    );
  }


  async refreshAccessTokenRequest(
    req: Request,
    res: Response
  ) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendError(
        res,
        "Refresh token is required",
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const result =
      await this._refreshAccessToken.execute(
        refreshToken
      );
// console.log("refresh tokeeeeeeeeee,",result)
    return sendSuccess(
      res,
      "Access token refreshed successfully",
      {
        accessToken: result.accessToken,
    name: `${result.account.firstName} ${result.account.lastName}`,
    role: result.account.role,
      },
      HttpStatusCode.OK
    );
  }


  async adminRegistrationRequest(
    req: Request,
    res: Response
  ) {
    const validatedData =
      adminRegistrationSchema.parse(req.body);

    const result =
      await this._adminRegistration.execute(
        validatedData
      );

    return sendSuccess(
      res,
      "Admin registered successfully",
      result,
      HttpStatusCode.CREATED
    );
  }
// Logout
  async logoutRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  
    await this._logout.execute();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "lax",
    });


    return sendSuccess(res,"Logged out successfully",HttpStatusCode.OK)
   
 
}
}




