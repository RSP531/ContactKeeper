const express = require("express");
const app = express();
const port = process.env.port || 5000;

app.get("/", (req, res) => res.json({ msg: "WELCOME TO THE API bi-otch" }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
