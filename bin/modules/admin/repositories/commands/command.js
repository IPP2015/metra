class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneRole(document){
    this.db.setCollection('role');
    const result = await this.db.insertOne(document);
    return result;
  }

  async insertOneAdmin(document) {
    this.db.setCollection('admin');
    const result = await this.db.insertOne(document);
    return result;
  }
}

module.exports = Command;
