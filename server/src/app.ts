import express, { Application } from "express";
import path from "path";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
const app: Application = express();
app.use(cors());
app.use(express.json({ limit: 52428800 }));
//serve static files in dev
app.use(express.static("testupload"));
app.use("/images/", express.static(path.join(__dirname, "../testupload")));

require("./startup/routes")(app);

const port: String = process.env.PORT || "5000";
app.listen(port, () => console.log(`[server]: Sever running on port: ${port}`));
