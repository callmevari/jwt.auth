const MongoService = require('./MongoService');
const RedisService = require('./RedisService');

module.exports = {
  MongoService, // as DataBaseService
  RedisService, // as CacheService
};