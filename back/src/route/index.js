import authRoutes from "./auth.js";
import sauceRoutes from "./sauce.js";

/**
 * Enregistre les routes de l'API
 * @param {Express} app - Instance de Express
 * @returns {Express} Retourne instance de Express
 */
export default function routeRegister(app) {
  app.use(authRoutes);
  app.use(sauceRoutes);
  return app;
}
