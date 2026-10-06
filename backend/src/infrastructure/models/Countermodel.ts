import { Schema, model } from "mongoose";

interface CounterDocument {
  _id: string;
  sequence: number;
}

const counterSchema = new Schema<CounterDocument>({
  _id: {
    type: String,
    required: true,
  },

  sequence: {
    type: Number,
    default: 0,
  },
});

export const CounterModel = model<CounterDocument>(
  "Counter",
  counterSchema
);