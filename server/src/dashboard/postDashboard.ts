import { Request, Response } from "express";
import pool from "../startup/dbConnection";

const postPlace = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    data.place = data.place.toLowerCase();
    const postLocation = await pool.query(
      "INSERT INTO userplaces (user_id, place) VALUES ($1, $2) RETURNING *",
      //   //TODO: user_id auth
      [1, data.place]
    );
    res.send(postLocation.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

const postItem = async (req: Request, res: Response) => {
  try {
    const user = req.params.userId;
    const location = req.params.location;
    const itemFilePath = req.params[0];
    const data = req.body;
    //TODO: add user to filepath in prod
    const postItem = await pool.query(
      "INSERT INTO itemlist (user_id, place, item, item_quantity, item_purchase_price, item_total_price, item_purchase_date, item_description, item_file_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
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
    res.json(postItem.rows[0].item_id);
  } catch (err) {
    console.log(err);
  }
};

// let storage = multer.diskStorage({
//   // pass function that will generate destination path
//   destination: (req:any, file:any, cb:any) => {
//     // initial upload path
//     let destination = path.join(__dirname, "uploads"); // ./uploads/

//     // if user logged in and You store user object in session
//     if (req.session && req.session.user && req.session.user.id) {
//       destination = path.join(
//         destination,
//         "users",
//         req.session.user.id,
//       );
//     } else {
//       destination = path.join(destination, "files");// ./uploads/files/
//     }

//     cb(null, destination);
//   },
// });

const postFile = async (req: any, res: Response) => {
  try {
    const user = req.params.userId;
    const location = req.params.location;
    const itemId = req.params.itemId;
    const file = req.file;

    //TODO: add user to filepath in prod
    const postFileUpload = await pool.query(
      "INSERT INTO stored_file_path (item_id, user_id, place, dashboard, file_path, file_size) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [itemId, user, location, false, file.path, file.size]
    );
    res.json(file.path);
  } catch (err) {
    console.log(err);
  }
};

export { postPlace, postItem, postFile };
