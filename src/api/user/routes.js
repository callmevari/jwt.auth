const router = require('express').Router();

const UserController = require('./controller');
const { isLoggedIn } = require('../../middlewares');

router.get('/', (req, res) => res.send('This is /api/user/'));
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/panel', isLoggedIn, UserController.panel);

module.exports = router;