const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect the Database
connectDB();

app.get("/", (req, res) => res.json({ msg: "WELCOME TO THE API bi-otch" }));

//Define the Routes to be use
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const port = process.env.port || 5000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
