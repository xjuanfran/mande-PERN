const {Router} = require('express');
const {} = require('../controllers/address.controller.js');

const router = Router();

router.get('/address', getAllAddress);

router.get('/address/:id', getAddress);

router.post('/address', createAddress);

router.put('/address/delete/:id', deleteAddress);

router.put('/address/:id', updateAddress);

module.exports = router;