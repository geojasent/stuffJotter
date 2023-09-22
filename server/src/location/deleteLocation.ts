import { Request, Response } from "express";
import pool from "../startup/dbConnection";

const deleteLocation = async (req: Request, res: Response) => {
  const user = req.params.userId;
  const location = req.params.location.toLowerCase();
  //TODO: delete image from server
  try {
    const deleteItemlistLocation = await pool.query(
      `DELETE from itemlist where user_sub = '${user}' AND place = '${location}' RETURNING *`
    );
    const deleteStoredfilepathLocation = await pool.query(
      `DELETE from stored_file_path where user_sub = '${user}' AND place = '${location}' RETURNING *`
    );
    const deleteUserLocation = await pool.query(
      `DELETE from userplaces where user_sub = '${user}' AND place = '${location}' RETURNING *`
    );
    res.json(deleteUserLocation.rowCount);
  } catch (err) {
    console.log(err);
  }
};
export { deleteLocation };
