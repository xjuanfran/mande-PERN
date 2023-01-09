const {Router} = require('express');
const {getAllPayMethod, getPayMethod, createPayMethod, deletePayMethod, updatePayMethod} = require('../controllers/payM.controller.js');

const router = Router();

router.get('/PayMethod', getAllPayMethod);

router.get('/PayMethod/:id', getPayMethod);

router.post('/PayMethod', createPayMethod);

router.put('/PayMethod/delete/:id', deletePayMethod);

router.put('/PayMethod/:id', updatePayMethod);

module.exports = router;