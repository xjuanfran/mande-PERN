const { Router } = require('express');
const { getAllWork, getWork, createWork, deleteWork, updateWork } = require('../controllers/work.controller.js');

const router = Router();

router.get('/work', getAllWork);

router.get('/work/1', getWork);

router.post('/work/', createWork);

router.delete('/work/', deleteWork);

router.put('/work/', updateWork);

module.exports = router;