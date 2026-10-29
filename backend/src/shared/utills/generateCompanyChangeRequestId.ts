import { CounterModel } from "../../infrastructure/models/Countermodel";

export async function generateCompanyChangeRequestId(): Promise<string> {
  const counter = await CounterModel.findOneAndUpdate(
    {
      _id: "company-change-request",
    },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
    },
  ).lean();

  if (!counter) {
    throw new Error("Failed to generate company change request number");
  }

  return `CCR-${String(counter.sequence).padStart(6, "0")}`;
}