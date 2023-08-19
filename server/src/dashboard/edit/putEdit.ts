import { Request, Response } from "express";
import pool from "../../startup/dbConnection";

const getUserLocationItems = async (req: Request, res: Response) => {
  try {
    const user = req.params.userId;
    const location = req.params.location;
    const locationItemData = await pool.query(
      `SELECT * from itemlist WHERE user_id = ${user} AND place = '${location}'`
    );
    res.send(locationItemData.rows);
  } catch (err) {
    console.log(err);
  }
};

const putItem = async (req: Request, res: Response) => {
  try {
    const user = req.params.userId;
    const location = req.params.location;
    const itemId = req.params.itemId;
    const itemFilePath = req.params[0];
    const data = req.body;

    const putItem = await pool.query(
      `UPDATE itemList SET user_id = $1, place = $2, item = $3 ,item_quantity = $4, item_purchase_price = $5, item_total_price = $6, item_purchase_date = $7, item_description = $8, item_file_path = $9 WHERE user_id = ${user} AND item_id = ${itemId} RETURNING *`,
      [
        user,
        location,
        data.item,
        data.itemQuantity,
        data.purchasePrice,
        data.totalAmount,
        data.datePurchased,
        data.itemDescription,
        itemFilePath,
      ]
    );
    res.send(putItem.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

const putItemFile = async (req: any, res: Response) => {
  try {
    const itemId = Number(req.params.itemId);
    const user = Number(req.params.userId);
    const location = req.params.location;
    const dashboard: boolean = false;
    const file = req.file;

    const postFileUpload = await pool.query(
      `INSERT INTO stored_file_path (item_id, user_id, place, dashboard, file_path, file_size) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (item_id) DO UPDATE SET item_id = $1, user_id = $2, place = $3, dashboard = $4, file_path = $5, file_size = $6`,
      [itemId, user, location, dashboard, file.path, file.size]
    );
    res.json(file.path);
  } catch (err) {
    console.log(err);
  }
};

export { getUserLocationItems, putItem, putItemFile };
