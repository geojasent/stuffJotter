import express, { Application } from "express";

const dashboardRouter = require("../routes/dashboard");
const locationsRouter = require("../routes/locations");

module.exports = function (app: Application) {
  app.use(express.json());

  app.use("/", dashboardRouter);
  app.use("/locations", locationsRouter);
};
