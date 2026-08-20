import { Router } from "express";
import { authController } from "../../container/container";

import {adminRegistrationSchema} from "../../application/validators/AdminRegistrationValidator"
const router = Router();

router.post("/send-otp", async (req, res) => {
  try {
    await authController.sendOtpRequest(req.body.email);

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    if (
      error instanceof Error &&
      error.message === "Email is already verified"
    ) {
      return res.status(409).json({
        message: "Email already exixts",
      });
    }

    return res.status(500).json({
      message: "Failed to send OTP",
    });
  }
});
router.post("/varify-otp", async (req, res) => {
  try {
    const isValid = await authController.verifyOtpRequest({
      email: req.body.email,
      otp: req.body.otp,
    });
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }
    res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to verify OTP",
    });
  }
});

router.post("/create-password", async (req, res) => {
  try {
    await authController.createPasswordRequest({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    return res.status(200).json({
      message: "Password created successfully",
    });
  } catch (error) {
  console.error("Create Password Error:", error);

  return res.status(500).json({
    message: "Failed to create password",
    error: error instanceof Error ? error.message : error
  });
}
});


router.post("/admin-register",async(req,res)=>{
  try {
    const validatedData=adminRegistrationSchema.parse(req.body)
    await authController.adminRegistrationRequest(validatedData)
      return res.status(201).json({
      message: "Admin registered successfully",
    });
  } catch (error) {
     console.error("Registration Error:", error);
       return res.status(500).json({
      message: "Failed to register admin",
      error: error instanceof Error ? error.message : error,
    });
  }
})

export default router;