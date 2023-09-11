import express from "express";
import { putLocationFile } from "../location/putFile";
import { getLocationFile } from "../location/getFile";

const multer = require("multer");
const router = express.Router();

const upload = multer({
  dest: process.env.FILEPATH,
  limits: { fileSize: 25 * 1024 * 1024 },
});

router.get("/:userId", getLocationFile);

router.put(
  "/putFile/:userId/:location/",
  upload.single("upload-photo"),
  putLocationFile
);

module.exports = router;
