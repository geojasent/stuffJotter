import { Request, Response } from "express";
import pool from "../startup/dbConnection";

const getLocationFile = async (req: Request, res: Response) => {
  try {
    const user = req.params.userId;

    const getLocationFile = await pool.query(
      `SELECT place, file_path FROM userplaces WHERE user_sub = '${user}'`
    );
    res.send(getLocationFile.rows);
  } catch (err) {
    console.log(err);
  }
};

export { getLocationFile };
