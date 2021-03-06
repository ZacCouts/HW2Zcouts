const Express = require('express');

const router = Express.Router();

const Controller = require('../controller');

router.get('/', Controller.getUsers);

module.exports = router;
