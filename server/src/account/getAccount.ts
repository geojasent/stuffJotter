import { Request, Response } from "express";
import pool from "../startup/dbConnection";

const getAccount = async (req: Request, res: Response) => {
  const user = req.params.userId;
  const data = await pool.query(
    `SELECT subscription from stuffjotterusers WHERE user_sub = '${user}'`
  );

  if (data.rows[0]) {
    res.json(data.rows[0]);
  } else {
    res.json(null);
  }
};
export { getAccount };
