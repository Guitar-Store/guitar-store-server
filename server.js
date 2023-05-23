'use strict';

require('dotenv').config();

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;


const root = require('./routes/root');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
// const chatRoutes = require('./routes/chatRoutes');
// const sendPrompt = require('./Chat/prime');

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use('/', root);
app.use('/api/products', productRoutes);
app.use('/api/basket', customerRoutes);
// app.use('/api/chat', chatRoutes);
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not found' });
  } else {
    res.type('txt').send('404 Not found');
  }
});

// chat API

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests when db is connected
    app.listen(PORT, () => console.log(`connected to db and listening on ${PORT}`));
    // sendPrompt();
  })
  .catch((err) => console.log(err));
