import express from "express";
import { getUserLocations } from "../dashboard/getDashboard";
import { postPlace, postItem, postFile } from "../dashboard/postDashboard";
import {
  getUserLocationItems,
  putItemFile,
  putItem,
} from "../dashboard/edit/putEdit";
import { deleteItem } from "../dashboard/edit/deleteEdit";

const multer = require("multer");
const router = express.Router();

const upload = multer({
  dest: process.env.FILEPATH,
  limits: { fileSize: 25 * 1024 * 1024 },
});

router.post("/newLocation", postPlace);

router.get("/:userId", getUserLocations);

router.get("/dashboard/edit/:userId/:location", getUserLocationItems);

router.put("/dashboard/edit/putItem/:userId/:location/:itemId/*", putItem);

router.put(
  "/dashboard/edit/putItemAndFile/:userId/:location/:itemId/*",
  upload.single("upload-photo"),
  putItemFile
);

router.delete("/dashboard/edit/delete/:userId/:location/:itemId", deleteItem);

router.post(`/postItem/:userId/:location/*`, postItem);

router.post(
  "/dashboard/postFile/:userId/:location/:itemId",
  upload.single("upload-photo"),
  postFile
);

module.exports = router;
