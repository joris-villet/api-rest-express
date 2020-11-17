const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');

router.get('/', mainController.homePage);

router.get('/api/user', userController.getAll);
router.get('/api/user/:id', userController.getOne);
router.post('/api/register', userController.create);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);


module.exports = router;