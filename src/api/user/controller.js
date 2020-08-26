const { UserService } = require('../../services');
const { RegisterSchema } = require('../../schemas');
const { CryptoUtil } = require('../../utils');

class UserController {

  login(req, res, next) {
    try {
      return res.send('UserController.login not implemented yet');
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
      // TODO: we'll create the user in the db
      return res.json({ 
        message: "User created successfuly",
        email,
        hashedPassword
      });
    } catch (err) {
      next(err);
    }
  }

};

module.exports = new UserController();