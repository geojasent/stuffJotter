import express, { Application } from "express";

var dashboardRouter = require("../routes/dashboard");

module.exports = function (app: Application) {
  app.use(express.json());

  app.use("/", dashboardRouter);
};
