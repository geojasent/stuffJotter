import { Request, Response } from "express";
import pool from "../startup/dbConnection";

const postAccount = async (req: Request, res: Response) => {
  const email = req.body.email;
  const role = "user";
  const subscribed = false;
  const user = req.params.userId;
  const data = await pool.query(
    "INSERT INTO stuffjotterusers (user_email, user_role, subscription, user_sub) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, role, subscribed, user]
  );
  res.send(data.rowCount[0]);
};
export { postAccount };
