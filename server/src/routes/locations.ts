import express from "express";
import { updateLocationFile } from "../location/putFile";
import { getLocationFile } from "../location/getFile";
import { updateLocation } from "../location/putLocation";
import { deleteLocation } from "../location/deleteLocation";

const multer = require("multer");
const router = express.Router();

const upload = multer({
  dest: process.env.FILEPATH,
  limits: { fileSize: 25 * 1024 * 1024 },
});

router.get("/:userId", getLocationFile);

router.put("/:userId/:currentLocation/:newLocation", updateLocation);

router.delete("/:userId/:location", deleteLocation);

router.post(
  "/putFile/:userId/:currentLocation",
  upload.single("upload-photo"),
  updateLocationFile
);

module.exports = router;
