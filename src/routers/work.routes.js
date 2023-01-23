const { Router } = require('express');
const { getAllWork, getAllMyWorks, getWork, getActiveWork, createWork, deleteWork, updateWork } = require('../controllers/work.controller.js');

const router = Router();

router.get('/work', getAllWork);

router.get('/work/getAllMyWorks/:id', getAllMyWorks);

router.get('/work', getActiveWork);

router.get('/work/:id', getWork);

router.post('/work/', createWork);

router.put('/work/delete/:id', deleteWork);

router.put('/work/:id', updateWork);

module.exports = router;