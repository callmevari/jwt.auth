const { MongoClient } = require('mongodb');

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
} = process.env;

class MongoService {
  constructor() {
    this.uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
    this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
    this.db = undefined;
  }

  async connect() {
    try {
      const { client } = this;
      await client.connect();
      this.db = client.db(MONGO_DATABASE);
      console.log(`🍃 Connected to ${this.db.databaseName} database`);
    } catch (err) {
      console.log(`Error while trying to connect to MongoDB, application will crash`, err);
      process.exit(1);
    }
  }

  close() {
    return this.client.close();
  }

  get(collectionName, query) {
    const collection = this.db.collection(collectionName);
    return collection.findOne(query);
  }

  async insert(collectionName, body) {
    const collection = this.db.collection(collectionName);
    const { ops } = await collection.insertOne(body);
    return {
      data: ops,
    };
  }
};

module.exports = new MongoService();