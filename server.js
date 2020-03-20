const express = require("express");
const mongoose = require("mongoose");
const item = require("./routes/api/items");
const path = require("path");

const app = express();

// Express body-parser
app.use(express.json());

// MongoDB config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected . . ."))
  .catch(err => console.log(err));

// Use the routes folder
app.use("/api/items", item);

// Serve static prod build
if (process.env.NODE_ENV === "production") {
  // Set the folder for static build
  app.use(express.static("/client/build"));

  // Serve all req except api requests with the static prod build
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Initialize server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port} . . .`));
