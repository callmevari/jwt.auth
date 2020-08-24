const router = require('express').Router();

router.get('/', (req, res) => res.send('<h1>Hello world! This is /api</h1>'));

module.exports = router;