const {Router} = require('express');
const {getAllReviews, getReviews, createReviews, updateReviews} = require('../controllers/reviews.controller.js');

const router = Router();

router.get('/reviews', getAllReviews);

router.get('/reviews/:id', getReviews);

router.post('/reviews', createReviews);

router.put('/reviews/:id', updateReviews);

module.exports = router;