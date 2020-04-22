const express = require("express");
const route = express.Router();
const controller = require("../controllers/productcontroller");

route.get("/", controller.list);
route.get("/:id", controller.getbyId);
route.put("/", controller.checkout)

module.exports = route;