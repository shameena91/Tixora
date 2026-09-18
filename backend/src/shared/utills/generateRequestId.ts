import { CounterModel } from "../../infrastructure/models/Countermodel";

export async function generateRequestId(): Promise<string> {
  const year = new Date().getFullYear();

  const counter = await CounterModel.findOneAndUpdate(
    {
      _id: `company-request-${year}`,
    },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
    }
  ).lean();

  return `TXR-${year}-${String(counter.sequence).padStart(4, "0")}`;
}
