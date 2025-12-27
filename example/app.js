const express = require("express");
const auth = require("../src");

const app = express();
app.use(express.json());
app.use(auth());

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Server running on port 3000"));
