const {Router} = require('express');
const {getAllEmployeesWork, getEmployeesWork, createEmployeesWork, deleteEmployeesWork,activeEmployeesWork, updateEmployeesWork} = require('../controllers/employeesWork.controller');

const router = Router();

router.get('/employeesWork', getAllEmployeesWork);

router.get('/employeesWork/:emp_id/:w_id', getEmployeesWork);

router.post('/employeesWork', createEmployeesWork);

router.put('/employeesWork/delete/:emp_id/:w_id', deleteEmployeesWork);

router.put('/employeesWork/active/:emp_id/:w_id', activeEmployeesWork);

router.put('/employeesWork/:emp_id/:w_id', updateEmployeesWork);

module.exports = router;