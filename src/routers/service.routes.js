const { Router } = require('express');
const { getAllservice, getservice, createservice, deleteservice, updateservice } = require('../controllers/service.controller.js');

const router = Router();

router.get('/service', getAllservice);

router.get('/service/:id', getservice);

router.post('/service/', createservice);

router.put('/service/delete/:id', deleteservice);

router.put('/service/:id', updateservice);

module.exports = router;