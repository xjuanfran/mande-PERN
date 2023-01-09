const {Router} = require('express');
const {getAllUsers, getUser, createUser, deleteUser, updateUser} = require('../controllers/user.controller.js');

const router = Router();

router.get('/user', getAllUsers);

router.get('/user/:id', getUser);

router.post('/user', createUser);

router.put('/user/delete/:id', deleteUser);

router.put('/user/:id', updateUser);

module.exports = router;