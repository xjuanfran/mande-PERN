const { Router } = require('express');
const { getAllPerson, getPerson, createPerson, personValidation, loginPersonClient, loginPersonEmployee,deletePerson, updatePerson } = require('../controllers/person.controller.js');

const router = Router();

router.get('/person', getAllPerson);

router.get('/person/:id', getPerson);

router.post('/person', createPerson);

router.post('/person/validation', personValidation);

router.post('/person/login/client', loginPersonClient);

router.post('/person/login/employee', loginPersonEmployee);

router.put('/person/delete/:id', deletePerson);

router.put('/person/:id', updatePerson);

module.exports = router;