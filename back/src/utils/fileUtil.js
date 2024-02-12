// @ts-check
import { config } from "../config.js";

/**
 * Retourne l'url absolut du fichier
 * @param {string} filename
 * @returns {string}
 */
export function getFileUrl(filename) {
  return `${config.PUBLIC_URL}/files/${filename}`;
}

/**
 * Retourne le nom d'un fichier par son path
 * @param {string} raw
 * @returns {string}
 */
export function getFilenameByPath(raw) {
  const splittedRaw = raw.split("/");
  return splittedRaw[splittedRaw.length - 1];
}
