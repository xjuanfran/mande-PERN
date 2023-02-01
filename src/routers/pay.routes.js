const {Router} = require('express');
const {getAllPay, getPay, pendingPay, createPay, deletePay, updatePay, paymentPay} = require('../controllers/pay.controller.js');

const router = Router();

router.get('/pay', getAllPay);

router.get('/pay/:id', getPay);

router.get('/pay/pending/:id', pendingPay);

router.post('/pay', createPay);

router.put('/pay/delete/:id', deletePay);

router.put('/pay/:id', updatePay);

router.put('/pay/payment/:id', paymentPay);

module.exports = router;