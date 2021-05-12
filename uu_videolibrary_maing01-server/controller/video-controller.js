const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/video/get-abl");
const CreateAbl = require("../abl/video/create-abl");
const UpdateAbl = require("../abl/video/update-abl");
const DeleteAbl = require("../abl/video/delete-abl");
const ListAbl = require("../abl/video/list-abl");

router.post("/create", async (req, res) => {
  const { body } = req;
  await CreateAbl(body, res);
});

router.get("/get", async (req, res) => {
  const { body } = req;
  await GetAbl(body, res);
});

router.put("/update", async (req, res) => {
  const { body } = req;
  await UpdateAbl(body, res);
});

router.delete("/delete", async (req, res) => {
  const { body } = req;
  await DeleteAbl(body, res);
});

router.get("/list", async (req, res) => {
  const { body } = req;
  await ListAbl(body, res);
});

module.exports = router;
