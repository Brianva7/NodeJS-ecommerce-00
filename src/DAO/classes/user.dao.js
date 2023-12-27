import userModel from "../models/user.model.js";

export class userDao {
  constructor() {
    this.model = userModel;
  }
  async getUsers() {
    try {
      const users = await this.model.paginate({}, { lean: true });
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserById(uid) {
    try {
      const user = await this.model.findById(uid);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createUser(user) {
    try {
      const newUser = await this.model.create(user);
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteUser(uid) {
    try {
      const deletedUser = await this.model.findByIdAndDelete(uid);
      return deletedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async upgradeDegradeUser(uid) {
    try {
      const user = await this.model.findById(uid);

      if (user.role === "user") {
        user.role = "premium";
      } else if (user.role === "premium") {
        user.role = "user";
      } else {
        user.role = "admin";
      }

      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.model.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async changePassword(id, password) {
    try {
      const user = await this.model.findById(id);
      user.password = password;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateLastConnection(id) {
    try {
      const user = await this.model.findById(id);
      const last_connection = new Date();
      user.last_connection = last_connection;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async uploadDocuments(uid, documents) {
    try {
      const user = await this.model.findById(uid);
      user.documents = documents;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getInactiveUsers() {
    const users = await this.model.paginate({}, { lean: true });
    const now = new Date();

    const inactiveUsers = users.docs.filter((user) => {
      const lastConnection = new Date(user.last_connection);
      const thirtyMinutesAgo = new Date(now.getTime() - 1000 * 60 * 30);
      return lastConnection < thirtyMinutesAgo;
    });

    return inactiveUsers;
  }
}
