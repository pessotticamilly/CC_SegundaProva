const express = require("express");
const router = require("./router").default;
const app = express();
const port = 8080;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
    console.log("App listen on http://localhost:" + port);
});