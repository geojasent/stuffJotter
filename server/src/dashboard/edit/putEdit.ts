import { Request, Response } from "express";
import pool from "../../startup/dbConnection";

const getUserLocationItems = async (req: Request, res: Response) => {
  try {
    const user = req.params.userID;
    const location = req.params.location;
    const locationItemData = await pool.query(
      `SELECT * from itemlist WHERE user_id = ${user} AND place = '${location}'`
    );
    res.send(locationItemData.rows);
  } catch (err) {
    console.log(err);
  }
};

const putUserLocationItem = async (req: Request, res: Response) => {
  try {
    const user = req.params.userID;
    const location = req.params.location;
    const itemID = req.params.itemID;
    const data = req.body;
    const putItem = await pool.query(
      `UPDATE itemList SET user_id = $1, place = $2, item = $3 ,item_quantity = $4, item_purchase_price = $5, item_total_price = $6, item_purchase_date = $7, item_description = $8 WHERE user_id=${user} AND item_id = ${itemID} RETURNING *`,
      [
        user,
        location,
        data.item,
        data.itemQuantity,
        data.purchasePrice,
        data.totalAmount,
        data.datePurchased,
        data.itemDescription,
      ]
    );
    res.send(putItem.rowsCount);
  } catch (err) {
    console.log(err);
  }
};

export { getUserLocationItems, putUserLocationItem };
