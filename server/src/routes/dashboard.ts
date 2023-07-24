import express, { Request, Response } from "express";
import pool from "../startup/dbConnection";
const multer = require("multer");
const router = express.Router();

//multiple gets for different forms using params as search query
router.get("/", async (req: Request, res: Response) => {
  try {
    // const userList = await pool.query(`SELECT * FROM stuffJotterUsers`);
    // const storedItems = await pool.query(`SELECT * FROM itemList`);
    const userLocations = await pool.query(
      `SELECT place FROM userplaces WHERE user_id = 1`
    );
    res.send(userLocations.rows);
  } catch (err) {
    console.log(err);
  }
});

router.post("/newLocation", async (req: Request, res: Response) => {
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
});

router.post(`/:userID/:location`, async (req: Request, res: Response) => {
  try {
    const user = req.params.userID;
    const location = req.params.location;
    const data = req.body;
    res.send("added");
  } catch (err) {
    console.log(err);
  }
});

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

//file upload
const upload = multer({
  dest: process.env.FILEPATH, //TODO: handle filepath
  limits: { fileSize: 25 * 1024 * 1024 },
});

router.post(
  `/:userID/:location/:item/:filename`,
  upload.single("upload-photo"),
  async (req: any, res: Response) => {
    try {
      const user = req.params.userID;
      const location = req.params.location;
      const item = req.params.item;
      const file = req.file;
      const newUpload = await pool.query(
        "INSERT INTO stored_file_path (user_id, item, place, dashboard, file_path, file_size) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [user, item, location, false, file.path, file.size]
      );
      res.json(newUpload.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
