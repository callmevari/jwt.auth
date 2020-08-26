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

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, val) => {
        if (err || val === null) {
          if (err) reject (err);
          else resolve(false); // key is missing / not exists
        } else resolve(JSON.parse(val));
      });
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, JSON.stringify(value), (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
};

module.exports = new RedisService();