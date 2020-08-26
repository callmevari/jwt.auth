const { UserService, AuthService, RedisService } = require('../../services');
const { RegisterSchema, LoginSchema } = require('../../schemas');
const { CryptoUtil } = require('../../utils');

class UserController {

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const {
        REDIS_TOKEN_LIST,
        TOKEN_EXPIRE_MILISECONDS,
        TOKEN_EXPIRE_SECONDS
      } = process.env;

      // validate the fields
      const validate = LoginSchema.validate({ email, password });
      if (validate.error) throw new Error(validate.error.message);

      // look up for a user with the same email
      const user = await UserService.get(email);
      if (!user) throw new Error('User not exists');

      // authenticate
      const { password: hashedPassword } = user;
      const checkPassword = await CryptoUtil.bcryptCompareHash(password, hashedPassword);
      if (!checkPassword) throw new Error('Password is invalid');

      // create jwt tokens (both)
      delete user.password;
      const accessToken = await AuthService.createToken(user, 'access', TOKEN_EXPIRE_SECONDS);
      const refreshToken = await AuthService.createToken(user, 'refresh');

      // save the refresh token in redis
      let refreshTokenList = await RedisService.get(REDIS_TOKEN_LIST);
      if (refreshTokenList) refreshTokenList.push(refreshToken);
      else refreshTokenList = [refreshToken];
      await RedisService.set(process.env.REDIS_TOKEN_LIST, refreshTokenList);

      // store the tokens in client side cookies
      res.cookie('accessToken', accessToken, { maxAge: TOKEN_EXPIRE_MILISECONDS });
      res.cookie('refreshToken', refreshToken);

      return res.json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      // validate the fields
      const validate = RegisterSchema.validate({ email, password });
      if (validate.error) throw new Error(validate.error.message);

      // look up for a user with the same email
      const userFound = await UserService.get(email);
      if (userFound) throw new Error('User already exists');

      // hash the password
      const hashedPassword = await CryptoUtil.bcryptHash(password);
      if (!hashedPassword) throw new Error('Error while hashing the password');

      // create the user in the db
      const user = await UserService.create({ ...req.body, password: hashedPassword });
      if (!user) throw new Error('Error while creating the user');

      return res.json({ 
        message: `User with email ${email} created successfuly`
      });
    } catch (err) {
      next(err);
    }
  }

  panel(req, res, next) {
    try {
      return res.send('Welcome to /api/user/panel endpoint');
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw new Error('There is not a refresh token in the request');
      await AuthService.destroyRefreshToken(refreshToken);
      return res.status(204).send('Logout successful');
    } catch (err) {
      next(err);
    }
  }
};

module.exports = new UserController();