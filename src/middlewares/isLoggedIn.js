const { AuthService } = require('../services');

const isLoggedIn = (req, res, next) => AuthService.validateToken(req, res, next);
module.exports = isLoggedIn;