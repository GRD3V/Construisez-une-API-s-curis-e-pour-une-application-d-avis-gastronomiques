// @ts-check
import { resBadRequest } from "../../utils/responseHelper.js";
import validator from "validator";
import Express from "express";

/**
 * Valide login body
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {Function} next
 * @returns {void}
 */
export function assertLoginBody(request, response, next) {
  /** @type {string | undefined} */
  const email = request.body.email;
  /** @type {string | undefined} */
  const password = request.body.password;

  if (!email) {
    resBadRequest(response, "L'email doit être renseigné.");
    return;
  }

  if (!password) {
    resBadRequest(response, "Le mot de passe doit être renseigné.");
    return;
  }

  if (typeof email !== "string") {
    resBadRequest(response, "L'email doit être une chaine de caractère.");
    return;
  }

  if (typeof password !== "string") {
    resBadRequest(response, "L'email doit être une chaine de caractère.");
    return;
  }

  request.body = {
    email,
    password,
  };

  next();
}

/**
 * Valide register body
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {Function} next
 * @returns {void}
 */
export function assertRegisterBody(request, response, next) {
  /** @type {string | undefined} */
  const email = request.body.email;
  /** @type {string | undefined} */
  const password = request.body.password;

  if (!email) {
    resBadRequest(response, "L'email doit être renseigné.");
    return;
  }

  if (!validator.isEmail(email)) {
    resBadRequest(response, "L'email doit être valide.");
    return;
  }

  if (!password) {
    resBadRequest(response, "Le mot de passe doit être renseigné.");
    return;
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    resBadRequest(response, "Le mot de passe n'est pas assez fort.");
    return;
  }

  if (typeof email !== "string") {
    resBadRequest(response, "L'email doit être une chaine de caractère.");
    return;
  }

  if (typeof password !== "string") {
    resBadRequest(response, "L'email doit être une chaine de caractère.");
    return;
  }

  request.body = {
    email,
    password,
  };

  next();
}
