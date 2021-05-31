"use strict";

const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/category/get-abl");
const CreateAbl = require("../abl/category/create-abl");
const UpdateAbl = require("../abl/category/update-abl");
const DeleteAbl = require("../abl/category/delete-abl");
const ListAbl = require("../abl/category/list-abl");

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

module.exports = router;
