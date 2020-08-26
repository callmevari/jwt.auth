const jwt = require('jsonwebtoken');
const RedisService = require('./RedisService');

class AuthService {
  createToken(payload, secret, expires = null) {
    const tokenSecret = (secret === 'access') ? process.env.TOKEN_ACCESS_SECRET : process.env.TOKEN_REFRESH_SECRET;
    if (expires) return jwt.sign(payload, tokenSecret, { expiresIn: expires });
    return jwt.sign(payload, tokenSecret);
  }

  validateToken(req, res, next) {
    const {
      accessToken,
      refreshToken,
    } = req.cookies;

    const {
      TOKEN_ACCESS_SECRET,
      TOKEN_REFRESH_SECRET,
      TOKEN_EXPIRE_SECONDS,
      TOKEN_EXPIRE_MILISECONDS,
      REDIS_TOKEN_LIST,
    } = process.env;

    // case 1: user has tokens (both)
    if (accessToken && refreshToken) {
      jwt.verify(accessToken, TOKEN_ACCESS_SECRET, async (err) => {
        if (err) return res.status(401).json(err);
        let refreshTokenList = await RedisService.get(REDIS_TOKEN_LIST);
        if (!refreshTokenList) return res.status(500).send('refreshTokenList does not exists');
        if (refreshTokenList.includes(refreshToken)) {
          jwt.verify(refreshToken, TOKEN_REFRESH_SECRET, (err, user) => {
            if (err) return res.status(401).json(err);
            req.user = user;
            return next();
          });
        } else return res.status(401).send('Unauthorized');
      });
    }

    // case 2: user doesn't have accessToken, but has refreshToken


    // case 3: user doesn't have tokens

  }
};

module.exports = new AuthService();