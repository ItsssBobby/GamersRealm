const mongoose = require('mongoose');

const DB_NAME = 'GamersRealm';
const DB_URL = `mongodb://localhost/${DB_NAME}`;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to database: ${DB_NAME}`);
});