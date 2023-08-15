import express from "express";
import { getUserLocations } from "../dashboard/getDashboard";
import {
  postNewPlace,
  postNewItem,
  postNewFile,
} from "../dashboard/postDashboard";
import {
  getUserLocationItems,
  putUserLocationItem,
} from "../dashboard/edit/putEdit";
const multer = require("multer");
const router = express.Router();

const upload = multer({
  dest: process.env.FILEPATH,
  limits: { fileSize: 25 * 1024 * 1024 },
});

router.get("/:userID", getUserLocations);

router.get("/dashboard/edit/:userID/:location", getUserLocationItems);

router.put("/dashboard/edit/:userID/:location/:itemID", putUserLocationItem);

router.post("/newLocation", postNewPlace);

router.post(`/postNewItem/:userID/:location/*`, postNewItem);

router.post(
  `/:userID/:location/:item/:filename`,
  upload.single("upload-photo"),
  postNewFile
);

module.exports = router;
