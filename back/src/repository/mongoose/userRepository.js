// @ts-check
import userSchema from "../../db/schema/userSchema.js";

export default {
  /**
   * Créer un user
   * @param {import("../../types/dto/UserCreationRequest.js").UserCreationRequest} userCreationRequest
   * @returns {Promise<import("../../types/schema/UserSchema.js").UserSchema>}
   */
  createUser(userCreationRequest) {
    return userSchema.create({
      email: userCreationRequest.email,
      password: userCreationRequest.password,
    });
  },

  /**
   * Trouve un user par son email
   * @param {string} email
   * @returns {Promise<import("../../types/schema/UserSchema.js").UserSchema | undefined>}
   */
  findUserByEmail(email) {
    return userSchema.findOne({ email }).exec();
  },
};
