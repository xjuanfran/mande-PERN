const {Router} = require ('express');

const router = Router();

router.get('/work', (req, res) => {
    res.send("Get Puto");
});

router.get('/work/1', (req, res) => [
    res.send("Te liste Putoooo")
]);

router.post('/work/', (req, res) => [
    res.send("Post Puto")
]);

router.delete('/work/', (req, res) => [
    res.send("Te Elimine Putoooo")
]);

router.put('/work/', (req, res) => [
    res.send("Te edite Putoooo")
]);

module.exports = router;