// @ts-check
import jwt from "jsonwebtoken";
import { config } from "../config.js";

/**
 *
 * @param {{
 *  userId: string;
 * }} payload
 * @returns
 */
export function generateTokenForUser(payload) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1h" });
}

/**
 *
 * @param {string} token
 * @returns
 */
export function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}
