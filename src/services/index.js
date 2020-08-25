const MongoService = require('./MongoService');
const RedisService = require('./RedisService');
const UserService = require('./UserService');

module.exports = {
  MongoService, // as DataBaseService
  RedisService, // as CacheService
  UserService,
};