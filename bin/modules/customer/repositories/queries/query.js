class Query {

  constructor(db){
    this.db=db;
  }

  async findOneCustomer(parameter){
    this.db.setCollection('customer');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }
}
module.exports = Query;
