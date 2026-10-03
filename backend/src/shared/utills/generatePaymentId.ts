import { CounterModel } from "../../infrastructure/models/Countermodel";

export async function generatePaymentId(): Promise<string> {
  const counter = await CounterModel.findOneAndUpdate(
    {
      _id: "payment",
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

  return `PAY-${String(counter.sequence).padStart(6, "0")}`;
}