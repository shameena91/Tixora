import {
  Schema,
  Types,
  type Connection,
  type Model,
} from "mongoose";

import {
  PERMISSIONS,
} from "../../../../../shared/constants/permissionCatalog";

import type {
  PermissionCode,
} from "../../../../../shared/constants/permissionCatalog";
import { RoleStatus } from "../../../domain/entities/Role";

export interface RoleDocument {
  _id: Types.ObjectId;
  name: string;
  description: string;
  permissions: PermissionCode[];
  isSystemRole: boolean;
  roleStatus:RoleStatus
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    permissions: {
      type: [
        {
          type: String,
          enum: Object.values(PERMISSIONS),
        },
      ],
      default: [],
    },

    isSystemRole: {
      type: Boolean,
      required: true,
      default: false,
      immutable: true,
    },
   roleStatus: {
  type: String,
  enum: Object.values(RoleStatus),
  required: true,
  default: RoleStatus.ACTIVE,
  index: true,
},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


roleSchema.index(
  { name: 1 },
  { unique: true },
);

export const getRoleModel = (
  connection: Connection,
): Model<RoleDocument> => {
  return (
    (connection.models.Role as
      | Model<RoleDocument>
      | undefined) ??
    connection.model<RoleDocument>(
      "Role",
      roleSchema,
    )
  );
};