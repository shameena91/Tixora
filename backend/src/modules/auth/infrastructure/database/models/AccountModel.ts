import mongoose, { Schema } from "mongoose";
import { AccountStatus, RegistrationStep } from "../../../domain/entities/Account";

const accountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    firstName: {
      type: String,
   
      trim: true,
    },

    lastName: {
      type: String,
    
      trim: true,
    },

    phone: {
      type: String,
   
      trim: true,
    },

    designation: {
      type: String,
    
      trim: true,
    },
    passwordHash: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.PENDING,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    registrationStep: {
      type: String,
      enum: Object.values(RegistrationStep),
      default: RegistrationStep.ADMIN_DETAILS,
    },
  },
  {
    timestamps: true,
  }
);

export const AccountModel = mongoose.model(
  "Account",
  accountSchema
);