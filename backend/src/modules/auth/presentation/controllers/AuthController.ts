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
    private readonly login: ILogin,
    private readonly sendOtp: ISendRegistrationOtp,
    private readonly verifyOtp: IVarifyOtp,
    private readonly createPassword: ICreatePassword,
    private readonly forgotPassword: IForgotPassword,
    private readonly resetPassword: IResetPassword,
    private readonly refreshAccessToken: IRefreshAccessToken,
    private readonly adminRegistration: IAdminRegistration,
    private readonly logout: ILogout
  ) {}

  // Login
  async loginRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.login.execute(req.body);

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

  // Send OTP
  async sendOtpRequest(
    req: Request,
    res: Response
  ) {
    const { email } = req.body;

    await this.sendOtp.execute(email);

    return sendSuccess(
      res,
      "OTP sent successfully",
      undefined,
      HttpStatusCode.OK
    );
  }

  // Verify OTP
  async verifyOtpRequest(
    req: Request,
    res: Response
  ) {
    const { email, otp, purpose } = req.body;

    const isValid = await this.verifyOtp.execute({
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

  // Create Password
  async createPasswordRequest(
    req: Request,
    res: Response
  ) {
    await this.createPassword.execute({
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

  // Forgot Password
  async forgotPasswordRequest(
    req: Request,
    res: Response
  ) {
    await this.forgotPassword.execute(
      req.body.email
    );

    return sendSuccess(
      res,
      "OTP sent successfully",
      undefined,
      HttpStatusCode.OK
    );
  }

  // Verify Reset OTP
  async verifyResetOtpRequest(
    req: Request,
    res: Response
  ) {
    const isValid = await this.verifyOtp.execute({
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

  // Reset Password
  async resetPasswordRequest(
    req: Request,
    res: Response
  ) {
    await this.resetPassword.execute(
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

  // Refresh Access Token
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
      await this.refreshAccessToken.execute(
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

  // Admin Registration
  async adminRegistrationRequest(
    req: Request,
    res: Response
  ) {
    const validatedData =
      adminRegistrationSchema.parse(req.body);

    const result =
      await this.adminRegistration.execute(
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
  
    await this.logout.execute();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "lax",
    });


    return sendSuccess(res,"Logged out successfully",HttpStatusCode.OK)
   
 
}
}




