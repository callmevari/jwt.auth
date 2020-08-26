const MongoService = require('./MongoService');

class UserService {
  constructor() {
    this.collection = 'user';
  }

  get(key) {
    const query = { email: key };
    return MongoService.get(this.collection, query);
  }

  create(body) {
    return MongoService.insert(this.collection, body);
  }
};

module.exports = new UserService();