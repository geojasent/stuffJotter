import express from "express";
import { editLocation, getUserPlaces } from "../dashboard/getDashboard";
import {
  postNewPlace,
  postNewItem,
  postNewFile,
} from "../dashboard/postDashboard";
const multer = require("multer");
const router = express.Router();

const upload = multer({
  dest: process.env.FILEPATH, //TODO: handle filepath
  limits: { fileSize: 25 * 1024 * 1024 },
});

//multiple gets for different forms using params as search query
router.get("/:userID", getUserPlaces);

router.get("/dashboard/edit/:userID/:location", editLocation);

router.post("/newLocation", postNewPlace); //TODO: update requst to use userid param

router.post(`/:userID/:location`, postNewItem);

router.post(
  `/:userID/:location/:item/:filename`,
  upload.single("upload-photo"),
  postNewFile
);

module.exports = router;
