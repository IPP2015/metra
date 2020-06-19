const ObjectId = require('mongodb').ObjectId;
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneUser(document){
    this.db.setCollection('user');
    const result = await this.db.insertOne(document);
    return result;
  }

  async upsertOneUser(id, document){
    this.db.setCollection('user');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.upsertOne(parameter, document);
    return result;
  }
}

module.exports = Command;
