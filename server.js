const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect the Database
connectDB();

//Initialize MiddleWare
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "WELCOME TO THE API bi-otch" }));

//Define the Routes to be use
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.port || 5000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
