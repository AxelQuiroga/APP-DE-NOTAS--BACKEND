import User from "../models/userModel.js";

export default class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findById(id) {
    return User.findById(id).select('-password');
  }

  async create(data) {
    const user = new User(data);
    return user.save();
  }
}
