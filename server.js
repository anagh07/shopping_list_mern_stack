const express = require("express");
const mongoose = require("mongoose");
const item = require('./routes/api/items');

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
app.use('/api/items', item);

  // Initialize server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port} . . .`));
