
const Admin = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const createRole = async (payload) => {
  const admin = new Admin(db);
  const postCommand = async payload => admin.createRole(payload);
  return postCommand(payload);
};

const registerAdmin = async (payload) => {
  const admin = new Admin(db);
  const postCommand = async payload => admin.registerAdmin(payload);
  return postCommand(payload);
};

module.exports = {
  createRole,
  registerAdmin,
};
