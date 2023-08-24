import express, { Application } from "express";
import path from "path";
import cors from "cors";
import * as dotenv from "dotenv";
const { auth } = require("express-oauth2-jwt-bearer");

dotenv.config();

const app: Application = express();

app.use(cors());

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: "RS256",
});
app.use(jwtCheck);

app.use(express.json({ limit: 52428800 }));
//serve static files in dev
app.use(express.static("testupload"));
app.use("/images/", express.static(path.join(__dirname, "../testupload")));

require("./startup/routes")(app);

const port: String = process.env.PORT || "5000";

app.listen(port, () => console.log(`[server]: Sever running on port: ${port}`));
