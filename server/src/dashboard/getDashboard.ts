import { Request, Response } from "express";
import pool from "../startup/dbConnection";

//multiple gets for different forms using params as search query
const getDashboardPlaces = async (req: Request, res: Response) => {
  try {
    //TODO: send rows
    // const userList = await pool.query(`SELECT * FROM stuffJotterUsers`);
    // const storedItems = await pool.query(`SELECT * FROM itemList`);
    const userLocations = await pool.query(
      `SELECT place FROM userplaces WHERE user_id = 1`
    );
    res.send(userLocations.rows);
  } catch (err) {
    console.log(err);
  }
};

export { getDashboardPlaces };
