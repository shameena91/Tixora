import { CounterModel } from "../../infrastructure/models/Countermodel";

export async function generateEmployeeId(): Promise<string> {
  const counter = await CounterModel.findOneAndUpdate(
    {
      _id: "employee",
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

  return `EMP-${String(counter.sequence).padStart(4, "0")}`;
}