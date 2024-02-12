import express from "express";
import routeRegister from "./route/index.js";
import { config } from "./config.js";
import { initMongoose } from "./db/index.js";
import cors from "cors";
import helmet from "helmet";

debugLog("Demmarage du serveur...");
debugLog("Connection à MongoDB...");

initMongoose()
  .then((session) => {
    debugLog("Mongoose connecté");
    initAPI();
  })
  .catch((error) => {
    debugLog("Mongoose non-connecté.");
    exitError("Impossible de ce connecter à MongoDB", error);
  });

function initAPI() {
  const app = express();
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(cors());
  app.use((request, _response, next) => {
    if (!request.locals) request.locals = {};
    next();
  });
  app.use((request, response, next) => {
    const startTime = new Date();

    console.log(
      `[${startTime.toISOString()}] [REQ] ${request.method} ${request.url}`
    );

    response.on("finish", () => {
      const endTime = new Date();
      const responseTime = endTime - startTime;

      console.log(
        `[${endTime.toISOString()}] [RES] ${response.statusCode} ${
          request.method
        } ${request.url} - ${responseTime}ms`
      );
    });
    next();
  });

  const router = express.Router();
  routeRegister(router);
  app.use("/api", router);

  app.use("/files", express.static("tmp/fs"));

  // 404
  app.use(function (req, res) {
    res.status(404).json({
      statusCode: 404,
      message: `Cannot GET ${req.url}`,
      error: "Not Found",
    });
  });

  app.listen(config.PORT, () => {
    debugLog("ready");
    console.log(`URL API: https://${config.HOST}:${config.PORT}/api`);
    console.log(`URL File: https://${config.HOST}:${config.PORT}/files`);
  });
}

function debugLog(...args) {
  const now = new Date();
  console.log(`[${now.toISOString()}]`, ...args);
}

function exitError(...args) {
  debugLog("Impossible de démarrer le serveur.", ...args);
  process.exit(1);
}
