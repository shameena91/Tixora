import { Types } from "mongoose";
import {
  Tenant,
  TenantStatus,
} from "../../domain/entities/Tenant";

export interface TenantDocument { 
  _id: Types.ObjectId;

  companyId: string;

  databaseName: string;

  status: TenantStatus;

  createdAt: Date;
  updatedAt: Date;
}

export interface TenantCreateData {
  companyId: Tenant["companyId"];

  databaseName: Tenant["databaseName"];

  status: Tenant["status"];

  createdAt: Tenant["createdAt"];
  updatedAt: Tenant["updatedAt"];
}

export class TenantMapper {
  // ------------------------------------
  // Persistence → Domain
  // ------------------------------------
  static toDomain(
    document: TenantDocument
  ): Tenant {
    return new Tenant(
      document._id.toString(),

      document.companyId,

      document.databaseName,

      document.status,

      document.createdAt,

      document.updatedAt,
    );
  }

  // ------------------------------------
  // Domain → Persistence
  // ------------------------------------
  static toPersistence(
    tenant: Tenant
  ): TenantCreateData {
    return {
      companyId: tenant.companyId,

      databaseName: tenant.databaseName,

      status: tenant.status,

      createdAt: tenant.createdAt,

      updatedAt: tenant.updatedAt,
    };
  }
}