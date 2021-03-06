const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Control = require('./controller');

const router = Express.Router();

router.get('/', Control.getInfo);

module.exports = router;

require('dotenv').config();

const app = Express();

app.use(BodyParser.json());

(async () => {
  await Mongoose.connect(process.env.Credentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('Database connection has been open');
});
