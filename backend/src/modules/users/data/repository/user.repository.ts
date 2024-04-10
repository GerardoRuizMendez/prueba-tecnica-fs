import rol from "../../domain/model/rol";
import user from "../../domain/model/user";
import DatabaseDataSource from "../datasource/user.datasource";

export default class UserRepository {
  private databaseDataSource: DatabaseDataSource;

  constructor() {
    this.databaseDataSource = new DatabaseDataSource();
  }

  async getAllUsers(): Promise<user[]> {
    return this.databaseDataSource.getAllUsers();
  }

  async getroles(): Promise<rol[]> {
    return this.databaseDataSource.getroles();
  }

  async getUserById(userId: number): Promise<user | null> {
    return this.databaseDataSource.getUserById(userId);
  }

  async createUser(newUser: user): Promise<user | null> {
    return this.databaseDataSource.createUser(newUser);
  }

  async updateUser(userId: number, updatedUser: user): Promise<user | null> {
    return this.databaseDataSource.updateUser(userId, updatedUser);
  }

  async deleteUser(userId: number): Promise<boolean> {
    return this.databaseDataSource.deleteUser(userId);
  }
}
