const { UserService } = require('../../services');
const { RegisterSchema } = require('../../schemas');

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
      // TODO: we'll search for a user with the same email
      const userFound = await UserService.get(email);
      if (userFound) throw new Error('User already exists');
      // TODO: we'll hash the password
      // TODO: we'll create the user in the db
      return res.json({ message: "User created successfuly" });
    } catch (err) {
      next(err);
    }
  }

};

module.exports = new UserController();