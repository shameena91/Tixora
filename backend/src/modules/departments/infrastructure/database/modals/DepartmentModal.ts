
import { Schema, Types, type Connection, type Model } from "mongoose";
import { DepartmentStatus } from "../../../domain/entities/department";

export interface DepartmentDocument {
  _id: Types.ObjectId;
  name: string;
  description: string | null;
  code: string;
  managerId: string | null;
  status: DepartmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new Schema<DepartmentDocument>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      default: null,
      trim: true,
    },

    managerId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: Object.values(DepartmentStatus),
      required: true,
      default: DepartmentStatus.ACTIVE,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const getDepartmentModel = (
  connection: Connection,
): Model<DepartmentDocument> => {
  return (
    (connection.models.Department as
      | Model<DepartmentDocument>
      | undefined) ??
    connection.model<DepartmentDocument>(
      "Department",
      departmentSchema,
    )
  );
};

