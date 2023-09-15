import { Request, Response } from "express";
import pool from "../../startup/dbConnection";

const deleteItem = async (req: Request, res: Response) => {
  try {
    const user = Number(req.params.userId);
    const location = req.params.location;
    const itemId = Number(req.params.itemId);
    const deleteItem = await pool.query(
      `DELETE from itemlist WHERE user_id = ${user} AND place = '${location}' AND item_id = ${itemId} RETURNING *`
    );

    res.send(deleteItem);
  } catch (err) {
    console.log(err);
  }
};

export { deleteItem };
