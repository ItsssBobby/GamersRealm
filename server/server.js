require('dotenv').config({ path: '../.env'}); // load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Welcome to the RAWG API');
});

// start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});