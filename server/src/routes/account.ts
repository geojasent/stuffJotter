import express from "express";
import { getAccount } from "../account/getAccount";

const router = express.Router();

router.get("/:userId", getAccount);

module.exports = router;
