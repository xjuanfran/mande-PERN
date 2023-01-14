const { Router } = require('express');
const { getAllemployee, getemployee, getAllMyWorks, createemployee, deleteemployee, updateemployee } = require('../controllers/employee.controller.js');

const router = Router();

router.get('/employee', getAllemployee);

router.get('/employee/:id', getemployee);

router.get('/employee/getAllMyWorks/:id', getAllMyWorks);

router.post('/employee/', createemployee);

router.put('/employee/delete/:id', deleteemployee);

router.put('/employee/:id', updateemployee);

module.exports = router;