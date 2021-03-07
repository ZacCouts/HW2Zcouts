const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
require('dotenv').config();

const Router = require('./router/router');

const app = Express();

app.use(BodyParser.json());

app.use('/', Router);

(async () => {
  await Mongoose.connect(process.env.Credentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
