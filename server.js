const app = require('./app');
require('dotenv').config();
const { connectToDB } = require('./db');

const PORT = process.env.PORT ?? 3000;

function connectServer() {
  app.listen(PORT, () => console.log('Connected to Server'));
}

connectToDB()
  .then(connectServer)
  .catch(process.exit);
