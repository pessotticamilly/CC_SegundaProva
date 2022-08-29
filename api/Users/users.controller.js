const express = require("express");
const router = express.Router();
const usersHandler = require("./users.handler");


router.get("/", async (req, res) => {
    res.json(await usersHandler.getUsers());
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await usersHandler.getUsersById(id));
});

router.post("/", async (req, res) => {
    const data = req.body;
    res.json(await usersHandler.createUsers(data));
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    res.json(await usersHandler.editUsers(data, id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await usersHandler.removeUsers(id));
});


module.exports = router;