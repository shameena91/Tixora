import mongoose, {
  type Connection,
} from "mongoose";
import { env } from "../../../../config/env";



export class TenantDatabaseManager {
  async connect(
    databaseName: string,
  ): Promise<Connection> {
    const baseUri = env.mongodbUri.replace(
      /\/[^/]+$/,
      "",
    );

    const tenantUri =
      `${baseUri}/${databaseName}`;

    const connection =
      mongoose.createConnection(tenantUri);

    await connection.asPromise();

    return connection;
  }
}