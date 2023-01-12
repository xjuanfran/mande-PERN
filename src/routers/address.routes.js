const {Router} = require('express');
const {getAllAddress, getAddress, getUserAddress, createAddress, deleteAddress, updateAddress} = require('../controllers/address.controller.js');

const router = Router();

router.get('/address', getAllAddress);

router.get('/address/:id', getAddress);

router.get('/address/list/:id', getUserAddress);

router.post('/address', createAddress);

router.put('/address/delete/:id', deleteAddress);

router.put('/address/:id', updateAddress);

module.exports = router;