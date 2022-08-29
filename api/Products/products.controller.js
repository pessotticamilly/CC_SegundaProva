const express = require("express");
const router = express.Router();
const productsHandler = require("./products.handler");


router.get("/", async (req, res) => {
    res.json(await productsHandler.getProducts());
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await productsHandler.getProductsById(id));
});

router.post("/", async (req, res) => {
    const data = req.body;
    res.json(await productsHandler.createProducts(data));
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    res.json(await productsHandler.editProducts(data, id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await productsHandler.removeProducts(id));
});


module.exports = router;