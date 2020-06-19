
const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const commonUtil = require('../../../../helpers/utils/common');
const { NotFoundError, ConflictError, InternalServerError } = require('../../../../helpers/error');
const { MongoError } = require('mongodb/lib/core/error');

const algorithm = 'aes-256-ctr';
const secretKey = 'Dom@in2018';

class Admin {

  constructor(db) {
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async createRole(payload) {
    const { roleId, roleName } = payload;
    const role = await this.query.findOneRole({ roleId });

    if (!role.err) {
      return wrapper.error(new ConflictError('role already exist'));
    }
    if (role.err instanceof MongoError) {
      return wrapper.error(new InternalServerError('failed to check existing role in database'));
    }

    const data = {
      roleId,
      roleName,
    };

    const { err, data: result } = await this.command.insertOneRole(data);
    if (err instanceof MongoError) {
      return wrapper.error(new InternalServerError('failed to insert role to database'));
    }
    return wrapper.data(result);

  }

  async registerAdmin(payload) {
    const { username, password, role: roleId } = payload;
    const role = await this.query.findOneRole({ roleId });

    if (!role.data) {
      return wrapper.error(new NotFoundError('role not found'));
    }
    if (role.err instanceof MongoError) {
      return wrapper.error(new InternalServerError('failed to check existing role in database'));
    }

    const admin = await this.query.findOneAdmin({ username });

    if (admin.data) {
      return wrapper.error(new ConflictError('admin already exist'));
    }

    const chiperPwd = await commonUtil.encrypt(password, algorithm, secretKey);
    const data = {
      username,
      password: chiperPwd,
      role: roleId
    };

    const { err, data: result } = await this.command.insertOneAdmin(data);
    if (err instanceof MongoError) {
      return wrapper.error(new InternalServerError('failed to register admin to database'));
    }
    return wrapper.data(result);

  }

}

module.exports = Admin;
