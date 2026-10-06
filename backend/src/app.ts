import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./modules/auth/presentation/routes/authRoutes";
import companyRequestRoutes from "./modules/company/presentation/routes/companyRequestRoutes";
// import subcsriptionPlanRoutes from "./modules/subScriptionPlans/presentation/routes/subcsriptionPlanRoutes";
import { errorHandler } from "./presentation/middlewares/errorHandlers";
import { notFoundHandler } from "./presentation/middlewares/notFoundHandler";

// import subscriptionRoutes from "./modules/subScriptionPlans/presentation/routes/subcsriptionPlanRoutes"
import timelineRoute from "./modules/timeline/presentation/route/timelineRoute";

import companyRoute from "./modules/company/presentation/routes/companyRoute"


import subcsriptionPlanRoutes from "./modules/subScriptionPlans/presentation/routes/subcsriptionPlanRoutes";

import subscriptionRoutes from "./modules/subScriptionPlans/presentation/routes/subscriptionRoutes";
import paymentRoutes from "./modules/payments/presentation/routes/PaymentRoutes"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.use(
  "/api/company-requests",
  companyRequestRoutes
);
app.use(
  "/api/subscription-plans",
  subcsriptionPlanRoutes
);
app.use(
  "/api/subscriptions",
  subscriptionRoutes
);
app.use(
   "/api/company-requests",
 timelineRoute
);

app.use(
   "/api/companies",
companyRoute
);
app.use("/api/companies", paymentRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Tixora API is running",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);
export default app;