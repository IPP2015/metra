
const ObjectId = require('mongodb').ObjectId;

class Query {

  constructor(db) {
    this.db = db;
  }

  async findOneRole(parameter) {
    this.db.setCollection('role');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findRoleById(id) {
    this.db.setCollection('role');
    const parameter = {
      _id: ObjectId(id)
    };
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findOneAdmin(parameter) {
    this.db.setCollection('admin');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findAdminById(id) {
    this.db.setCollection('admin');
    const parameter = {
      _id: ObjectId(id)
    };
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

}

module.exports = Query;
