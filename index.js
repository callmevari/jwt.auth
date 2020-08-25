require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser').json();
const cookieParser = require('cookie-parser')();

const app = express();
const routes = require('./src/routes');
const {
  MongoService,
  RedisService,
} = require('./src/services/index');

const {
  PORT = 3000,
  NODE_ENV,
  MONGO_CONNECT,
  REDIS_CONNECT,
} = process.env;

if (MONGO_CONNECT) MongoService.connect();
if (REDIS_CONNECT) RedisService.connect();

app.use(bodyParser);
app.use(cookieParser);
app.use('/api', routes);
app.use('/', (req, res) => res.redirect('/api'));

app.listen(PORT, () => {
  console.log(`🚀  Server ready at http://localhost:${PORT} in ${NODE_ENV} mode`);
});
