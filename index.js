const express = require("express");
const router = require("./router");
const app = express();
const port = 8080;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});