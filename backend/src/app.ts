import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./modules/auth/presentation/routes/authRoutes";
import companyRequestRoutes from "./modules/company/presentation/routes/companyRequestRoutes";
import { errorHandler } from "./presentation/middlewares/errorHandlers";
import { notFoundHandler } from "./presentation/middlewares/notFoundHandler";
import subcsriptionPlanRoutes from "./modules/SubScriptionPlans/presentation/routes/SubcsriptionPlanRoutes"



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
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Tixora API is running",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);
export default app;