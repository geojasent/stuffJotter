import { Response } from "express";
import pool from "../startup/dbConnection";

const updateLocation = async (req: any, res: Response) => {
  const user = Number(req.params.userId);
  const currentLocation = req.params.currentLocation.toLowerCase();
  const newLocation = req.params.newLocation.toLowerCase();
  try {
    const updateUserplacesPlace = await pool.query(
      `UPDATE userplaces SET place = '${newLocation}' WHERE place = '${currentLocation}' AND user_id = ${user} RETURNING *`
    );

    const updateStoredfilepathPlace = await pool.query(
      `UPDATE stored_file_path SET place = '${newLocation}' WHERE place = '${currentLocation}' AND user_id = ${user} RETURNING *`
    );

    const updateItemlistPlace = await pool.query(
      `UPDATE itemlist SET place = '${newLocation}' WHERE place = '${currentLocation}' AND user_id = ${user} RETURNING *`
    );

    res.json(`updated ${updateItemlistPlace.rowCount} rows`);
  } catch (err) {
    console.log(err);
  }
};

export { updateLocation };
