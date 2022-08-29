const express = require("express");
const router = express.Router();

const  orders = require("./api/Orders/orders.controller");
const  ordersProducts = require("./api/OrdersProducts/ordersProducts.controller");
const  products = require("./api/Products/products.controller");
const  users = require("./api/Users/users.controller");


router.use("/orders", orders);
router.use("/ordersProducts", ordersProducts);
router.use("/products", products);
router.use("/users", users);


module.exports = router;