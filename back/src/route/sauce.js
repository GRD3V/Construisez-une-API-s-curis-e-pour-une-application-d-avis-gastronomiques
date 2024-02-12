import express from "express";
import saucesController from "../controller/saucesController.js";
import { isConnected } from "../middleware/isConnected.js";
import { isAuthorizedAlterSauce } from "../middleware/isAuthorizedAlterSauce.js";
import {
  assertSauceCreationBody,
  assertSauceLikeUpdateBody,
  assertSauceUpdateBody,
} from "../middleware/assert/sauceAssert.js";
import { handleSaveImage } from "../middleware/multer.js";

const router = express.Router();

router.get("/sauces", isConnected, saucesController.getAllSauces);
router.get("/sauces/:sauceId", isConnected, saucesController.getSauceById);

router.post(
  "/sauces",
  isConnected,
  express.json(),
  handleSaveImage,
  assertSauceCreationBody,
  saucesController.createSauce
);

router.put(
  "/sauces/:sauceId",
  isConnected,
  express.json(),
  isAuthorizedAlterSauce,
  handleSaveImage,
  assertSauceUpdateBody,
  saucesController.updateSauce
);

router.delete(
  "/sauces/:sauceId",
  isConnected,
  isAuthorizedAlterSauce,
  saucesController.deleteSauce
);

router.post(
  "/sauces/:sauceId/like",
  isConnected,
  express.json(),
  assertSauceLikeUpdateBody,
  saucesController.updateSauceLike
);

export default router;
