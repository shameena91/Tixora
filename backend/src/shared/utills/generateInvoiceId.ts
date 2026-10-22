import { CounterModel } from "../../infrastructure/models/Countermodel";

export async function generateInvoiceNumber(): Promise<string> {
  const counter = await CounterModel.findOneAndUpdate(
    {
      _id: "invoice",
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

  return `INV-${String(counter.sequence).padStart(6, "0")}`;
}