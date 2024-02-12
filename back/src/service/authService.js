// @ts-check
import userRepository from "../repository/mongoose/userRepository.js";
import { generateTokenForUser } from "../utils/TokenUtil.js";
import { passwordHash, validPassword } from "../utils/bcryptUtil.js";

export default {
  /**
   * Récupère toute les sauce
   * @param {import("../types/dto/UserCreationRequest.js").UserCreationRequest} userCreationRequest
   * @returns {Promise<void>}
   */
  async createUser(userCreationRequest) {
    const potentialUser = await userRepository.findUserByEmail(
      userCreationRequest.email
    );
    if (potentialUser) throw new Error("EMAIL_NOT_AVAILABLE");

    await userRepository.createUser({
      email: userCreationRequest.email,
      password: await passwordHash(userCreationRequest.password),
    });
  },

  /**
   * Créer le token user
   * @param {import("../types/dto/UserLoginRequest.js").UserLoginRequest} userLoginRequest
   * @returns {Promise<{
   *  userId: string;
   *  token: string;
   * }>}
   */
  async loginUser(userLoginRequest) {
    const potentialUser = await userRepository.findUserByEmail(
      userLoginRequest.email
    );
    if (!potentialUser) throw new Error("USER_NOT_FOUND");

    const isGoodPass = await validPassword(
      userLoginRequest.password,
      potentialUser.password
    );

    if (!isGoodPass) throw new Error("BAD_PASSWORD");

    return {
      userId: potentialUser.id,
      token: generateTokenForUser({ userId: potentialUser.id }),
    };
  },
};
