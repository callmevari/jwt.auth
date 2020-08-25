class UserController {

  login(req, res, next) {
    try {
      return res.send('UserController.login not implemented yet');
    } catch (err) {
      next(err);
    }
  }

  register(req, res, next) {
    try {
      const { email, password } = req.body;
      // TODO: we'll validate the fields here
      // TODO: we'll search for a user with the same email
      // TODO: we'll hash the password
      // TODO: we'll create the user in the db
      return res.json({});
    } catch (err) {
      next(err);
    }
  }

};

module.exports = new UserController();