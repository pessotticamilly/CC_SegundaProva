const express = require("express");
const router = express.Router();
const ordersHandler = require("./orders.handler");


router.get("/", async (req, res) => {
    res.json(await ordersHandler.getOrders());
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await ordersHandler.getOrdersById(id));
});

router.post("/", async (req, res) => {
    const data = req.body;
    res.json(await ordersHandler.createOrders(data));
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    res.json(await ordersHandler.editOrders(data, id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await ordersHandler.removeOrders(id));
});


module.exports = router;