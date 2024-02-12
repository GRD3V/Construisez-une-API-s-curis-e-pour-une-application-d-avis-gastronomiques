import path from "path";
import multer from "multer";
import { config } from "../config.js";
import { resBadRequest } from "../utils/responseHelper.js";
import Express from "express";

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.FILE_STORAGE);
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    const newFilename = `${Date.now()}_${name}`;
    cb(null, newFilename);
  },
});

function checkFileType(res, file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toString());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Le fichier n'est pas une image.");
  }
}

/**
 * Permet l'interpretation de fichier (image)
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @param {() => void} next
 * @returns {void}
 */
export function handleSaveImage(request, response, next) {
  const upload = multer({
    storage: imageStorage,
    fileFilter(_req, file, cb) {
      checkFileType(response, file, cb);
    },
  }).single("image");

  upload(request, response, (err) => {
    if (err) {
      resBadRequest(response, err);
      return;
    }
    next();
  });
}
