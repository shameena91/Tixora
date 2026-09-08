
import { Router } from "express";

import { authController } from "../../container/container";

import { AUTH_ROUTES } from "../../../../shared/constants/route";

const router = Router();

router.post(
  AUTH_ROUTES.LOGIN,
  authController.loginRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.SEND_OTP,
  authController.sendOtpRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.VERIFY_OTP,
  authController.verifyOtpRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.CREATE_PASSWORD,
  authController.createPasswordRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.FORGOT_PASSWORD,
  authController.forgotPasswordRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.RESET_PASSWORD,
  authController.resetPasswordRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.ADMIN_REGISTER,
  authController.adminRegistrationRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.REFRESH,
  authController.refreshAccessTokenRequest.bind(authController)
);
router.post(
  AUTH_ROUTES.LOGOUT,
  authController.logoutRequest.bind(authController)
);
export default router;

