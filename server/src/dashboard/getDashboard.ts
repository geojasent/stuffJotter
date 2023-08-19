import { Request, Response } from "express";
import pool from "../startup/dbConnection";
import { dashboardData } from "./dashboardData";

const getUserLocations = async (req: Request, res: Response) => {
  try {
    const user = req.params.userId;
    let data;
    const userLocations = await pool.query(
      `SELECT place FROM userplaces WHERE user_id = ${user}`
    );

    if (userLocations.rows[0]) {
      const items = await pool.query(
        `SELECT * FROM itemlist WHERE user_id = ${user}`
      );
      data = dashboardData(userLocations.rows, items.rows);
    }
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export { getUserLocations };
