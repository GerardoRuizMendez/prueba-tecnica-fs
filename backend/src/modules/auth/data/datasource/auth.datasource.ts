import rol from "../../../users/domain/model/rol";
import user from "../../../users/domain/model/user";
import { userCredentials } from "../../model/userCredentials";
import { Pool } from "pg";

export default class AuthDatasource {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: `${process.env.DATABASE_URL}/${process.env.DB_NAME}`,
    });
  }

  async signIn(credentials: userCredentials): Promise<user | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        "SELECT * FROM usuario WHERE correo = $1",
        [credentials.email]
      );
      if (result.rowCount === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {}
    return null;
  }
}
