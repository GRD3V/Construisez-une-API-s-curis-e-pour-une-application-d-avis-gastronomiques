// @ts-check
import dotenv from "dotenv";
dotenv.config();
let maxLengthKeyEnv = 0;

export const config = {
  NODE_ENV: getEnv({
    key: "NODE_ENV",
    type: "string",
    required: true,
  }),

  // Server config
  HOST: getEnv({
    key: "HOST",
    type: "string",
    required: true,
  }),

  PORT: getEnv({
    key: "PORT",
    type: "number",
    required: true,
  }),

  PUBLIC_URL: getEnv({
    key: "PUBLIC_URL",
    type: "string",
    required: true,
  }),

  // Mongo client config
  MONGO_SRV: getEnv({
    key: "MONGO_SRV",
    type: "boolean",
    required: true,
  }),
  MONGO_USER: getEnv({
    key: "MONGO_USER",
    type: "string",
    required: true,
  }),

  MONGO_PASS: getEnv({
    key: "MONGO_PASS",
    type: "string",
    required: true,
  }),

  MONGO_HOST: getEnv({
    key: "MONGO_HOST",
    type: "string",
    required: true,
  }),

  MONGO_PORT: getEnv({
    key: "MONGO_PORT",
    type: "number",
    required: true,
  }),

  MONGO_DB: getEnv({
    key: "MONGO_DB",
    type: "string",
    required: true,
  }),

  // Credential config
  JWT_SECRET: getEnv({
    key: "JWT_SECRET",
    type: "string",
    required: true,
  }),

  HASH_SECRET: getEnv({
    key: "HASH_SECRET",
    type: "string",
    required: true,
  }),

  // File path config
  FILE_STORAGE: getEnv({
    key: "FILE_STORAGE",
    type: "string",
    required: true,
  }),
};

if (process.env.NODE_ENV === "dev") {
  for (const key in config) {
    const value = config[key];
    console.log(
      `${key}${" ".repeat(maxLengthKeyEnv + 0 - key.length)} = ${value}`
    );
  }
}

/**
 * @param {import("./types/EnvOptions").EnvOptions} options - Option
 * @returns {any | undefined} Return value typeof type or undefined
 */
function getEnv(options) {
  const { key, type, required, defaultValue } = options;
  /** @type {import("./types/EnvOptions").EnvOptionsValue} */
  let value = process.env[key] ?? defaultValue ?? undefined;

  if (required && !value) {
    throw new Error(
      `La variable d'environnement "${key}" n'a pas été définie !`
    );
  } else if (!value) {
    value = defaultValue ?? undefined;
  }

  if (typeof value === "string" && type === "number") {
    value = parseFloat(value);
  }

  if (typeof value === "string" && type === "boolean") {
    value = value.toLowerCase() === "true";
  }

  if (value && typeof value !== type) {
    throw new Error(
      `La variable d'environnement "${key}" est definie mais n'est pas de type "${type}"`
    );
  }
  if (key.length > maxLengthKeyEnv) maxLengthKeyEnv = key.length;
  return value;
}
