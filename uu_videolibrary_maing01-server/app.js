"use strict";

const express = require("express");
const videoRouter = require("./controller/video-controller");
const categoryRouter = require("./controller/category-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/video", videoRouter);
app.use("/category", categoryRouter);

app.listen(3000, () => {
  console.log("Express server listening on port 3000.");
});
 