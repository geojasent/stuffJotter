import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
require("./startup/routes")(app);

const port: String = process.env.PORT || "5000";
app.listen(port, () => console.log(`[server]: Sever running on port: ${port}`));
