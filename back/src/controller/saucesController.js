// @ts-check
import sauceService from "../service/sauceService.js";
import { resNotFound, resServerError } from "../utils/responseHelper.js";

export default {
  async getAllSauces(_request, response) {
    try {
      const sauceList = await sauceService.getAllSauce();
      response.status(200).json(sauceList);
    } catch (error) {
      resServerError(response, "Erreur technique");
      console.error(error);
    }
  },

  async getSauceById(request, response) {
    const sauceId = request.params["sauceId"];
    try {
      const sauce = await sauceService.getSauceById(sauceId);
      response.status(200).json(sauce);
    } catch (error) {
      /** @type {import("../types/serviceError/SauceServiceError.js").GetSauceByIdError} */
      const code = error.message;
      switch (code) {
        case "SAUCE_NOT_FOUND":
          resNotFound(response, "La sauce n'existe pas.");
          break;

        default:
          resServerError(response, "Erreur technique");
          console.error(error);
          break;
      }
    }
  },

  async createSauce(request, response) {
    const sauceCreationRequest = request.body;
    try {
      await sauceService.createSauce(sauceCreationRequest);
      response.status(201).json({ message: "Votre sauce a été crée !" });
    } catch (error) {
      resServerError(response, "Erreur technique");
      console.error(error);
    }
  },

  async updateSauce(request, response) {
    const sauceId = request.params["sauceId"];
    const sauceUpdateRequest = request.body;
    try {
      const { imageUrl } = request.locals["sauce"];
      await sauceService.updateSauce(sauceId, sauceUpdateRequest, imageUrl);
      response.status(200).json({ message: "Votre sauce a été mis à jour !" });
    } catch (error) {
      /** @type {import("../types/serviceError/SauceServiceError.js").UpdateSauceError} */
      const code = error.message;
      switch (code) {
        case "SAUCE_NOT_FOUND":
          resNotFound(response, "La sauce n'existe pas.");
          break;

        default:
          resServerError(response, "Erreur technique");
          console.error(error);
          break;
      }
    }
  },

  async deleteSauce(request, response) {
    const sauceId = request.params["sauceId"];
    try {
      const { imageUrl } = request.locals["sauce"];
      await sauceService.deleteSauce(sauceId, imageUrl);
      response.status(200).json({ message: "Votre sauce a été supprimé !" });
    } catch (error) {
      /** @type {import("../types/serviceError/SauceServiceError.js").DeleteSauceError} */
      const code = error.message;
      switch (code) {
        case "SAUCE_NOT_FOUND":
          resNotFound(response, "La sauce n'existe pas.");
          break;

        default:
          resServerError(response, "Erreur technique");
          console.error(error);
          break;
      }
    }
  },

  async updateSauceLike(request, response) {
    const sauceId = request.params["sauceId"];
    const userId = request.headers["userId"];
    const sauceLike = request.body.like;
    try {
      await sauceService.updateSauceLike(sauceId, userId, sauceLike);
      response.status(200).json({
        message: `Votre ${
          sauceLike > 0 ? "like" : "dislike"
        } à bien été pris en compte`,
      });
    } catch (error) {
      /** @type {import("../types/serviceError/SauceServiceError.js").DeleteSauceError} */
      const code = error.message;
      switch (code) {
        case "SAUCE_NOT_FOUND":
          resNotFound(response, "La sauce n'existe pas.");
          break;

        default:
          resServerError(response, "Erreur technique");
          console.error(error);
          break;
      }
    }
  },
};
