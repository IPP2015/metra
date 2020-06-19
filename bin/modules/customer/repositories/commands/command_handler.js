const Customer = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const registerCustomer = async (payload) => {
  const customer = new Customer(db);
  const postCommand = async payload => customer.register(payload);
  return postCommand(payload);
};

module.exports = {
  registerCustomer
};
