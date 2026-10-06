import { model, Schema ,Types} from "mongoose";



import { TenantStatus } from "../../../domain/entities/Tenant";

export interface TenantDocument {
  _id: Types.ObjectId;

  companyId: string;

  databaseName: string;

  status: TenantStatus;

  createdAt: Date;

  updatedAt: Date;
}

const tenantSchema = new Schema<TenantDocument>(
  {
    companyId: {
      type:String,
      ref: "Company",
      required: true,
      unique: true,
      index: true,
    },

    databaseName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(TenantStatus),
      required: true,
      default: TenantStatus.PROVISIONING,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TenantModel = model<TenantDocument>(
  "Tenant",
  tenantSchema,
);