const jwt = require('jsonwebtoken');
const RedisService = require('./RedisService');

class AuthService {
  createToken(payload, secret, expires = null) {
    const tokenSecret = (secret === 'access') ? process.env.TOKEN_ACCESS_SECRET : process.env.TOKEN_REFRESH_SECRET;
    if (expires) return jwt.sign(payload, tokenSecret, { expiresIn: expires });
    return jwt.sign(payload, tokenSecret);
  }
};

module.exports = new AuthService();