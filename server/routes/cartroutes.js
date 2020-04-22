const express = require("express");
const route = express.Router();
const controller = require("../controllers/cartcontroller");
const { authorize, authenticate } = require('../middlewares/OA')


route.use(authenticate);
route.get("/", controller.list);
route.delete('/', controller.checkout)
// route.get("/:id", controller.getbyId);
route.put("/:id", authorize, controller.edit);
route.delete("/:id", authorize, controller.delete);
module.exports = route;