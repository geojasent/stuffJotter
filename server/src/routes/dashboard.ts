import express, { Request, Response } from "express";
import pool from "../startup/dbConnection";
const router = express.Router();

//multiple gets for different forms using params as search query
router.get("/", async (req: Request, res: Response) => {
  try {
    // const userList = await pool.query(`SELECT * FROM stuffJotterUsers`);
    // const storedItems = await pool.query(`SELECT * FROM itemList`);
    const userLocations = await pool.query(`SELECT place FROM itemList`);
    res.send(userLocations.rows);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    data.place = data.place.toUpperCase();
    //TODO: redundant location chec
    const postLocation = await pool.query(
      "INSERT INTO userplaces (user_id, place) VALUES ($1, $2) RETURNING *",
      [1, data.place]
    );
    res.send(postLocation.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
