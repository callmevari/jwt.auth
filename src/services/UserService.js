const MongoService = require('./MongoService');

class UserService {
  get(key) {
    const query = { email: key };
    return MongoService.get('user', query);
  }
};

module.exports = new UserService();