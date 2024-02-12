import express from "express";
import authController from "../controller/authController.js";
import {
  assertRegisterBody,
  assertLoginBody,
} from "../middleware/assert/authAssert.js";

const router = express.Router();

router.post(
  "/auth/signup",
  express.json(),
  assertRegisterBody,
  authController.signup
);

router.post(
  "/auth/login",
  express.json(),
  assertLoginBody,
  authController.login
);

export default router;
