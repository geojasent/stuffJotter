import express, { Request, Response } from "express";
import pool from "../startup/dbConnection";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userList = await pool.query(`SELECT * FROM stuffJotterUsers`);
    const storedItems = await pool.query(`SELECT * FROM itemList`);
    res.send("Dashboard info");
    console.log(userList.rows[0]);
    console.log(storedItems.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
