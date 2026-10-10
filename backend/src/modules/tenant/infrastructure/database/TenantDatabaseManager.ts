// import mongoose, {
//   type Connection,
// } from "mongoose";
// import { env } from "../../../../config/env";



// export class TenantDatabaseManager {
//   async connect(
//     databaseName: string,
//   ): Promise<Connection> {
//     const baseUri = env.mongodbUri.replace(
//       /\/[^/]+$/,
//       "",
//     );

//     const tenantUri =
//       `${baseUri}/${databaseName}`;

//     const connection =
//       mongoose.createConnection(tenantUri);

//     await connection.asPromise();

//     return connection;
//   }
// }




import mongoose, {
  type Connection,
} from "mongoose";

import { env } from "../../../../config/env";

export class TenantDatabaseManager {
  private readonly _connections = new Map<
    string,
    Promise<Connection>
  >();

  async connect(
    databaseName: string,
  ): Promise<Connection> {
    const existingConnection =
      this._connections.get(databaseName);

    if (existingConnection) {
      return existingConnection;
    }

    const baseUri = env.mongodbUri.replace(
      /\/[^/]+$/,
      "",
    );

    const tenantUri = `${baseUri}/${databaseName}`;

    const connectionPromise = mongoose
      .createConnection(tenantUri)
      .asPromise();

    this._connections.set(
      databaseName,
      connectionPromise,
    );

    

    try {
      return await connectionPromise;
    } catch (error) {
      this._connections.delete(databaseName);
      throw error;
    }
  }

  async close(databaseName: string): Promise<void> {
  const connectionPromise =
    this._connections.get(databaseName);

  if (!connectionPromise) {
    return;
  }

  // Remove the cached connection first.
  this._connections.delete(databaseName);

  const connection = await connectionPromise;

  if (connection.readyState !== 0) {
    await connection.close();
  }
}
}

