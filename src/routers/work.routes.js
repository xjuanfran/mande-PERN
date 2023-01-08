const { Router } = require('express');
const { getAllWork, getWork, createWork, deleteWork, updateWork } = require('../controllers/work.controller.js');

const router = Router();

router.get('/work', getAllWork);

router.get('/work/:id', getWork);

router.post('/work/', createWork);

router.put('/work/delete/:id', deleteWork);

router.put('/work/:id', updateWork);

module.exports = router;