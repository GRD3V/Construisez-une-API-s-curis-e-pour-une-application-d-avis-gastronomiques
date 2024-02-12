// @ts-check
import authService from "../service/authService.js";
import {
  resBadRequest,
  resConflict,
  resNotFound,
  resServerError,
} from "../utils/responseHelper.js";

export default {
  async signup(request, response) {
    const signupRequest = request.body;
    try {
      await authService.createUser(signupRequest);
      response.status(201).json({ message: "Votre compte à bien été crée !" });
    } catch (error) {
      /** @type {import("../types/serviceError/AuthServiceError.js").RegisterError} */
      const code = error.message;
      switch (code) {
        case "EMAIL_NOT_AVAILABLE":
          resConflict(response, "Email déja pris.");
          break;

        default:
          resServerError(response, "Erreur technique");
          console.error(error);
          break;
      }
    }
  },
  async login(request, response) {
    const signupRequest = request.body;
    try {
      const loggedUser = await authService.loginUser(signupRequest);
      response.status(200).send(loggedUser);
    } catch (error) {
      /** @type {import("../types/serviceError/AuthServiceError.js").LoginError} */
      const code = error.message;
      switch (code) {
        case "USER_NOT_FOUND":
          resNotFound(response, "Utilisateur introuvable");
          break;
        case "BAD_PASSWORD":
          resBadRequest(response, "Mot de passe invalide");
          break;

        default:
          resServerError(response, "Erreur technique");
          console.error(error);
          break;
      }
    }
  },
};
