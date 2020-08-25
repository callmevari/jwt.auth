const router = require('express').Router();

const UserController = require('./controller');

router.get('/', (req, res) => res.send('This is /api/user/'));
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;