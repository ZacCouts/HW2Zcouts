const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
require('dotenv').config();

const Router = require('./router/router');

const app = Express();

app.use(BodyParser.json());

app.use('/', Router);

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('Database connection has been open');
});

(async () => {
  await Mongoose.connect(process.env.Credentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
