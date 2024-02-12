import { resBadRequest } from "../../utils/responseHelper.js";
import validator from "validator";
import fs from "fs";
import path from "path";
import { config } from "../../config.js";
import Express from "express";

/**
 * Valide sauce creation body
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {() => void} next
 * @returns {void}
 */
export function assertSauceCreationBody(request, response, next) {
  /**
   * @type {null | import("../../types/dto/SauceCreationRequest.js").SauceCreationRequest}
   */
  let body = null;
  if (request.body.sauce && typeof request.body.sauce === "string") {
    try {
      body = JSON.parse(request.body.sauce);
    } catch (error) {
      console.error(error);
      resBadRequest(response);
      return;
    }
  }
  if (!body) {
    resBadRequest(response);
    return;
  }

  if (!request.file) {
    resBadRequest(response, "Une image doit être fournis");
    return;
  }

  try {
    validateSauceBody(body);
  } catch (error) {
    resBadRequest(response, error.message);
    deletePotentialImage(path.join(config.FILE_STORAGE, request.file.filename));
    return;
  }

  request.body = {
    ...body,
    imageUrl: request.file.filename,
    userId: request.headers["userId"],
  };
  next();
}

/**
 * Valide sauce update body
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {() => void} next
 * @returns {void}
 */
export function assertSauceUpdateBody(request, response, next) {
  let body = request.body;
  if (body.sauce && typeof body.sauce === "string") {
    try {
      body = JSON.parse(body.sauce);
    } catch (error) {
      console.error(error);
      resBadRequest(response);
      return;
    }
  }

  try {
    validateSauceBody(body);
  } catch (error) {
    resBadRequest(response, error.message);
    if (request.file?.filename)
      deletePotentialImage(
        path.join(config.FILE_STORAGE, request.file.filename)
      );
    return;
  }

  const withFile = request.file
    ? {
        imageUrl: request.file.filename,
        userId: request.headers["userId"],
      }
    : {};

  request.body = {
    ...body,
    ...withFile,
  };
  next();
}

/**
 * Valide sauce like update body
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {() => void} next
 * @returns {void}
 */
export function assertSauceLikeUpdateBody(request, response, next) {
  let body = request.body;

  if (typeof body.like !== "number") {
    resBadRequest(response, "Le like n'est pas valide");
    return;
  }

  request.body = {
    like: body.like,
  };
  next();
}

function validateSauceBody(sauce) {
  function ignoreSpace(str) {
    return str.replaceAll(" ", "");
  }
  function isAlphanum(str) {
    return validator.isAlphanumeric(ignoreSpace(str), "fr-FR");
  }
  if (!isAlphanum(sauce.name)) {
    throw new Error("Le champs name n'est pas valide.");
  }
  if (!isAlphanum(sauce.description)) {
    throw new Error("Le champs description n'est pas valide.");
  }
  if (!isAlphanum(sauce.manufacturer)) {
    throw new Error("Le champs manufacturer n'est pas valide.");
  }
  if (!isAlphanum(sauce.mainPepper)) {
    throw new Error("Le champs mainPepper n'est pas valide.");
  }
  if (!validator.isNumeric(`${sauce.heat}`)) {
    throw new Error("Le champs heat n'est pas valide.");
  }
  if (sauce.heat < 1 || sauce.heat > 10) {
    throw new Error(
      "Le champs heat de peut pas être plus petit que 1 ou plus grand que 10."
    );
  }
}

/**
 * Verify & delete potential image
 * @param {string} path
 * @returns {void}
 */
function deletePotentialImage(path) {
  const isExist = fs.existsSync(path);
  if (isExist) fs.unlinkSync(path);
}
