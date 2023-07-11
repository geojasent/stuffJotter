import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

const app: Application = express();
dotenv.config();
const port: String = process.env.PORT || "3000";

app.use(cors());
app.use(express.json());

//landing page
app.get("/", async (req: Request, res: Response) => {
  try {
    res.send("Landing Page");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`Sever running on port: ${port}`));
