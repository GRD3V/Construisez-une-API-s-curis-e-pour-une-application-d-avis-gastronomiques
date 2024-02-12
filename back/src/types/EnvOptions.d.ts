/**
 * @typedef EnvOptions
 * @property {string} key - ID du produit
 * @property {string} type - Nom du produit
 * @property {boolean} required - Nom du produit
 * @property {string | undefined} defaultValue - Nom du produit
 */

export type EnvOptionsValue = string | number | boolean | undefined;
export type EnvOptions = {
  key: string;
  type: string;
  required: boolean;
  defaultValue?: EnvOptionsValue;
};
