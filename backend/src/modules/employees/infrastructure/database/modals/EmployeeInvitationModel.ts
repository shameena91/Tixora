
import mongoose, { Schema, Types } from "mongoose";

export interface EmployeeInvitationDocument {
  _id: Types.ObjectId;
  accountId: Types.ObjectId;
  invitedByAccountId: Types.ObjectId;
  companyId:Types.ObjectId,
  tokenHash: string;
  expiresAt: Date;
  acceptedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const employeeInvitationSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "Account",
    },
    invitedByAccountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    companyId:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:"company"
    },
    tokenHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const EmployeeInvitationModel =
  mongoose.model<EmployeeInvitationDocument>(
    "EmployeeInvitation",
    employeeInvitationSchema,
  );
