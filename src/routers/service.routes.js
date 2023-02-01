const { Router } = require('express');
const { getAllservice, getservice, getserviceRecord, createservice, deleteservice, updateservice } = require('../controllers/service.controller.js');

const router = Router();

router.get('/service', getAllservice);

router.get('/service/:id', getservice);

router.get('/service/record/:id', getserviceRecord);

router.post('/service/', createservice);

router.put('/service/delete/:id', deleteservice);

router.put('/service/:id', updateservice);

module.exports = router;