
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

// router.post(
//   AUTH_ROUTES.REFRESH,
//   authController.refreshAccessTokenRequest.bind(authController)
// );
router.post(
  AUTH_ROUTES.ADMIN_LOGOUT,
  authController.logoutAdminRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.EMPLOYEE_LOGOUT,
  authController.logoutEmployeeRequest.bind(authController)
);
router.post(
  AUTH_ROUTES.ADMIN_REFRESH,
  authController.refreshAdminAccessTokenRequest.bind(authController)
);

router.post(
  AUTH_ROUTES.EMPLOYEE_REFRESH,
  authController.refreshEmployeeAccessTokenRequest.bind(authController)
);
export default router;

