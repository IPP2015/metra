
class Command {

  constructor(db){
    this.db = db;
  }

  async insertOneCustomer(document){
    this.db.setCollection('customer');
    const result = await this.db.insertOne(document);
    return result;
  }
}
module.exports = Command;
