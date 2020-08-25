const router = require('express').Router();
const userRouter = require('./api/user/routes');

router.get('/', (req, res) => res.send('This is /api'));
router.use('/user', userRouter);

module.exports = router;