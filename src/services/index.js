const MongoService = require('./MongoService');
const RedisService = require('./RedisService');
const UserService = require('./UserService');
const AuthService = require('./AuthService');

module.exports = {
  MongoService, // as DataBaseService
  RedisService, // as CacheService
  UserService,
  AuthService,
};