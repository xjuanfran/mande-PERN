const {Router} = require('express');
const {getAllEmployeesWork, getEmployeesWork, createEmployeesWork, updateEmployeesWork} = require('../controllers/employeesWork.controller');

const router = Router();

router.get('/employeesWork', getAllEmployeesWork);

router.get('/employeesWork/:emp_id/:w_id', getEmployeesWork);

router.post('/employeesWork', createEmployeesWork);

router.put('/employeesWork/:emp_id/:w_id', updateEmployeesWork);

module.exports = router;