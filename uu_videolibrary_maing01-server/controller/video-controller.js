"use strict";

const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/video/get-abl");
const CreateAbl = require("../abl/video/create-abl");
const UpdateAbl = require("../abl/video/update-abl");
const DeleteAbl = require("../abl/video/delete-abl");
const ListAbl = require("../abl/video/list-abl");
const RatingAbl = require("../abl/video/rating-abl");

router.post("/create", async (req, res) => {
  const { body } = req;
  await CreateAbl(body, res);
});

router.get("/get", async (req, res) => {
  const { body } = req;
  await GetAbl(body, res);
});

router.post("/update", async (req, res) => {
  const { body } = req;
  await UpdateAbl(body, res);
});

router.post("/delete", async (req, res) => {
  const { body } = req;
  await DeleteAbl(body, res);
});

router.get("/list", async (req, res) => {
  const { body } = req;
  await ListAbl(body, res);
});

router.post("/rating", async (req, res) => {
  const { body } = req;
  await RatingAbl(body, res);
});

module.exports = router;
