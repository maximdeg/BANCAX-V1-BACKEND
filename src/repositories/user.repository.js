import User from "../models/user.model.js";

class UserRepository {
  static async getAll() {
    const users = await User.find();
    return users;
  }
  static async getById(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }

  static async getByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  static async saveUser(user_data) {
    const user = new User(user_data);
    return await user.save();
  }

  static async updateUser(user_id, data) {
    const user = await User.findOneAndUpdate({ _id: user_id }, data, {
      new: true,
    });
    return user;
  }

  // static async setEmailVerified(value, user_id) {
  //   const user = await UserRepository.getById(user_id);
  //   user.emailVerified = value;
  //   return await UserRepository.saveUser(user);
  // }
}

export default UserRepository;
