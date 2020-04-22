const express = require("express");
const route = express.Router();
const productroute = require("./productroutes");
const cartroute = require('./cartroutes')
const CustController = require("../controllers/custcontroller");


route.post("/register", CustController.register);
route.post("/login", CustController.login);



route.use("/product", productroute);
route.use("/cart", cartroute)

module.exports = route;
