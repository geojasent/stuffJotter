import { Response } from "express";
import pool from "../startup/dbConnection";

const putLocationFile = async (req: any, res: Response) => {
  try {
    const user = Number(req.params.userId);
    const location = req.params.location.toUpperCase();
    const file = req.file;

    const putFileUpload = await pool.query(
      `INSERT INTO userplaces (user_id, place, file_path, file_size) VALUES ($1, $2, $3, $4) ON CONFLICT (file_path) DO UPDATE SET user_id = $1, place = $2, file_path = $3, file_size = $4`,
      [user, location, file.path, file.size]
    );
    res.json(file.path);
  } catch (err) {
    console.log(err);
  }
};

export { putLocationFile };
