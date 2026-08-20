import express from "express";
import { errorHandler } from "./middlewares/errorHandlers";
import { notFoundHandler } from "./middlewares/notFoundHandler"
import authRoutes from "./modules/auth/presentation/routes/auth.routes";
import cors from "cors";
import companyRequestRoutes from "./modules/company/presentation/routes/companyRequestRoutes"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
  "/api/company-requests",
  companyRequestRoutes
);
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Tixor API is running",
  });
});
app.use(notFoundHandler);
app.use(errorHandler);
export default app;