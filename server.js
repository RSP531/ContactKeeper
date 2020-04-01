const express = require("express");
const app = express();
const port = process.env.port || 5000;

app.get("/", (req, res) => res.json({ msg: "WELCOME TO THE API bi-otch" }));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
