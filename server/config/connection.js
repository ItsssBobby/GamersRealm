const mongoose = require('mongoose');

const DB_NAME = 'GamersRealm';
const DB_URL = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;