// @ts-check

import { verifyToken } from "../utils/TokenUtil.js";
import { resServerError, resUnauthorized } from "../utils/responseHelper.js";
import Express from "express";

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {() => void} next
 * @returns {void}
 */
export function isConnected(request, response, next) {
  const authorization = request.headers["authorization"];
  if (!authorization) {
    resUnauthorized(response, "Token non fourni");
    return;
  }
  try {
    const tokenStr = authorization.replace("Bearer ", "");
    const token = verifyToken(tokenStr);
    request.headers["userId"] = token["userId"];
    next();
  } catch (error) {
    switch (error.message) {
      case "jwt expired":
        resUnauthorized(response, "Token expiré");
        return;
      case "invalid token":
        resUnauthorized(response, "Token invalide");
        return;

      default:
        console.error(error);
        resServerError(response, "Erreur technique");
        return;
    }
  }
}
