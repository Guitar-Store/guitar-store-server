"use strict";

require("dotenv").config();

const cors = require("cors");
const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT;

const productRoutes = require("./Routes/products-route");
const basketRoutes = require("./Routes/basket-route");

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use(cors());

// routes
app.use("/api/products", productRoutes);
app.use("/api/basket", basketRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests when db is connected
    app.listen(PORT, () => console.log(`connected to db and listening on ${PORT}`));
  })
  .catch((err) => console.log(err));
