const express = require("express");
const route = express.Router();
const controller = require("../controllers/productcontroller");
const { authorize, authenticate } = require('../middlewares/OA')

route.get("/", controller.list);
route.get("/:id", controller.getbyId);
route.use(authenticate);
route.put("/", controller.checkout)

module.exports = route;