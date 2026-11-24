import { Schema, type Connection } from "mongoose";
import { EmployeeStatus } from "../../../domain/entities/employee";


const employeeSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    employeeId: {
      type: String,
      required: true,
      trim: true,
    },

    departmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    roleId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    categoryIds: {
      type: [Schema.Types.ObjectId],
      default: [],
    },

    profilePhoto: {
      type: String,
      default: null,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    workload: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(EmployeeStatus),
      default: EmployeeStatus.PENDING,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


employeeSchema.index({ employeeId: 1 }, { unique: true });

export const createEmployeeModel = (connection: Connection) => {
  return (
    connection.models.Employee ||
    connection.model("Employee", employeeSchema)
  );
};