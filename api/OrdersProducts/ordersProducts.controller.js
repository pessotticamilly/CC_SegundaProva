const express = require("express");
const router = express.Router();
const ordersProductsHandler = require("./ordersProducts.handler");


router.get("/", async (req, res) => {
    res.json(await ordersProductsHandler.getOrdersProducts());
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await ordersProductsHandler.getOrdersProductsById(id));
});

router.post("/", async (req, res) => {
    const data = req.body;
    res.json(await ordersProductsHandler.createOrdersProducts(data));
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    res.json(await ordersProductsHandler.editOrdersProducts(data, id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await ordersProductsHandler.removeOrdersProducts(id));
});


module.exports = router;