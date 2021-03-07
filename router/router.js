const Express = require('express');

const router = Express.Router();

const Controller = require('../controller/controller');

router.get('/', Controller.getProd);
router.get('/', Controller.getProdSKU);
router.post('/', Controller.postProd);
router.delete('/', Controller.deleteProd);
router.delete('/', Controller.deleteProdSKU);
router.patch('/', Controller.patchProdSKU);

router.get('/', Controller.getUser);
router.get('/', Controller.getUserSSN);
router.post('/', Controller.postUser);
router.delete('/', Controller.deleteUser);
router.delete('/', Controller.deleteUserSSN);
router.patch('/', Controller.patchUserSSN);

module.exports = router;
