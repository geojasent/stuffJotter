import { Request, Response } from "express";
import pool from "../startup/dbConnection";

const postNewPlace = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    data.place = data.place.toUpperCase();
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

const postNewItem = async (req: Request, res: Response) => {
  try {
    const user = req.params.userID;
    const location = req.params.location;
    const data = req.body;
    //TODO: include filepath
    const postItem = await pool.query(
      "INSERT INTO itemlist (user_id, place, item, item_quantity, item_purchase_price, item_total_price, item_purchase_date, item_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
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

    res.send("added");
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

const postNewFile = async (req: any, res: Response) => {
  try {
    const user = req.params.userID;
    const location = req.params.location;
    const item = req.params.item;
    const file = req.file;

    const postFileUpload = await pool.query(
      "INSERT INTO stored_file_path (user_id, item, place, dashboard, file_path, file_size) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user, item, location, false, file.path, file.size]
    );
    res.json(postFileUpload.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

export { postNewPlace, postNewItem, postNewFile };
