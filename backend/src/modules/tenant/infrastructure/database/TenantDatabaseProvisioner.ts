import type { Connection } from "mongoose";

export class TenantDatabaseProvisioner {
  async provision(
    connection: Connection,
  ): Promise<void> {
    await connection.createCollection(
      "tenant_metadata",
    );
  }
}