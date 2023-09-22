import express from "express";
import { getAccount } from "../account/getAccount";
import { postAccount } from "../account/postAccount";

const router = express.Router();

router.get("/:userId", getAccount);

router.post("/:userId", postAccount);

module.exports = router;
