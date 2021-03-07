const Express = require('express');

const router = Express.Router();

const Controller = require('../controller/controller');

router.get('/', Controller.doActionThatMightFailValidation);

module.exports = router;
