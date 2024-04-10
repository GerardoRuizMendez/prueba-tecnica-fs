import user from "../../../users/domain/model/user";
import { userCredentials } from "../../model/userCredentials";
import AuthDatasource from "../datasource/auth.datasource";

export class AuthRepository {
  private dataSource: AuthDatasource;

  constructor() {
    this.dataSource = new AuthDatasource();
  }

  sigIn(credentials: userCredentials): Promise<user | null> {
    return this.dataSource.signIn(credentials);
  }
}
