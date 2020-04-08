const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect the Database
connectDB();

//Initialize MiddleWare
app.use(express.json({ extended: false }));

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

//PORT must be uppercase
const port = process.env.PORT || 5050;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
