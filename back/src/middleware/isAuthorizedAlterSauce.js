import sauceService from "../service/sauceService.js";
import {
  resForbidden,
  resNotFound,
  resServerError,
} from "../utils/responseHelper.js";
import Express from "express";

/**
 * Authorize alter sauce
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {Function} next
 * @returns {Promise<void>}
 */
export async function isAuthorizedAlterSauce(request, response, next) {
  const userId = request.headers["userId"];
  const sauceId = request.params["sauceId"];

  let sauce = null;
  try {
    sauce = await sauceService.getSauceById(sauceId);
  } catch (error) {
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
    return;
  }

  request.locals["sauce"] = sauce;

  if (sauce.userId.toString() !== userId) {
    resForbidden(
      response,
      "Vous n'êtes pas autoriser à modifier une sauce ne vous appartenant pas."
    );
    return;
  }

  next();
}
