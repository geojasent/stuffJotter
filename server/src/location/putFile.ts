import { Response } from "express";
import pool from "../startup/dbConnection";

const updateLocationFile = async (req: any, res: Response) => {
  const user = req.params.userId;
  const currentLocation = req.params.currentLocation.toLowerCase();
  const file = req.file;

  try {
    await pool.query(
      `UPDATE userplaces SET file_path = '${file.path}', file_size = '${file.size}' WHERE user_id = ${user} AND place = '${currentLocation}' RETURNING *`
    );
    res.json(file.path);
  } catch (err) {
    console.log(err);
  }
};

export { updateLocationFile };
