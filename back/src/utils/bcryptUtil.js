// @ts-check
import bcrypt from "bcrypt";

/**
 * Hash un string à l'aide de bcrypt
 * @param {string} text - Text à hash
 * @returns {Promise<string>} Retourne le hash du text
 */
export async function passwordHash(text) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return bcrypt.hash(text, salt);
}

/**
 * Compare le password
 * @param {string} text
 * @param {string} hash
 * @returns {Promise<boolean>} Retourne le hash du text
 */
export function validPassword(text, hash) {
  return bcrypt.compare(text, hash);
}
