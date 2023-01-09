const { Router } = require('express');
const { getAllemployee, getemployee, createemployee, deleteemployee, updateemployee } = require('../controllers/employee.controller.js');

const router = Router();

router.get('/employee', getAllemployee);

router.get('/employee/:id', getemployee);

router.post('/employee/', createemployee);

router.put('/employee/delete/:id', deleteemployee);

router.put('/employee/:id', updateemployee);

module.exports = router;