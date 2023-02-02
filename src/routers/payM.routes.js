const {Router} = require('express');
const {getAllPayMethod, getPayMethod, getPayMethodPerson, getPayMethodValidation, getPayMethodValidationUser, createPayMethod, deletePayMethod, updatePayMethod} = require('../controllers/payM.controller.js');

const router = Router();

router.get('/PayMethod', getAllPayMethod);

router.get('/PayMethod/:id', getPayMethod);

router.get('/PayMethod/Person/:id', getPayMethodPerson);

router.get('/PayMethod/Validation/:id', getPayMethodValidation);

router.get('/PayMethod/ValidationUser/:id/:card/:cvv', getPayMethodValidationUser);

router.post('/PayMethod', createPayMethod);

router.put('/PayMethod/delete/:id', deletePayMethod);

router.put('/PayMethod/:id', updatePayMethod);

module.exports = router;