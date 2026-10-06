import {
  Tenant,
} from "../../domain/entities/Tenant";

import {
  TenantDocument,
} from "../../infrastructure/database/models/TenantModel";

export interface TenantCreateData {
  companyId: Tenant["companyId"];

  databaseName: Tenant["databaseName"];

  status: Tenant["status"];
}

export class TenantMapper {

  
  static toDomain(
    document: TenantDocument,
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


  static toPersistence(
    tenant: Tenant,
  ): TenantCreateData {
    return {
      companyId: tenant.companyId,

      databaseName: tenant.databaseName,

      status: tenant.status,
    };
  }
}