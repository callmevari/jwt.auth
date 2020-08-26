const { UserService, AuthService } = require('../../services');
const { RegisterSchema, LoginSchema } = require('../../schemas');
const { CryptoUtil } = require('../../utils');

class UserController {

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

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
      const accessToken = await AuthService.createToken(user, 'access', process.env.TOKEN_EXPIRE_SECONDS);
      const refreshToken = await AuthService.createToken(user, 'refresh');

      // TODO: save the refresh token in redis
      // TODO: store the tokens in client side cookies

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

};

module.exports = new UserController();