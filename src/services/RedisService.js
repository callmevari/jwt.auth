const redis = require('redis');

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

class RedisService {
  constructor() {
    this.client = undefined;
  }

  async connect() {
    try {
      this.client = await redis.createClient({
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PASSWORD    
      });
      if (this.client !== undefined) console.log('⛵ Connected to redis database');
    } catch (err) {
      console.log('Error while trying to connect to redis, application will crash', err);
      process.exit(1);
    }
  }
};

module.exports = new RedisService();