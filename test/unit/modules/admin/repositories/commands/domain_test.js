const assert = require('assert');
const sinon = require('sinon');

const command = require('../../../../../../bin/modules/admin/repositories/commands/command');
const query = require('../../../../../../bin/modules/admin/repositories/queries/query');
const { Role, Admin } = require('../../../../../../bin/modules/admin/repositories/commands/domain');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Role-domain', () => {

  const queryResult = {
    'err': null,
    'data': {
      '_id': '5bac53b45ea76b1e9bd58e1c',
      'roleId': 'admin.test',
      'roleName': 'Test Role Admin'
    },
    'message': 'role admin successfully created',
    'code': 201
  };

  const payload = {
    'roleId': 'admin.test',
    'roleName': 'Test Role Admin'
  };

  const db = {
    setCollection: sinon.stub()
  };

  const role = new Role(db);

  before(() => {
    sinon.stub(logger, 'log');
  });

  after(() => {
    logger.log.restore();
  });

  describe('create', () => {

    it('should success create role admin', async() => {
      sinon.stub(query.prototype, 'findOneRole').resolves({ data: null});
      sinon.stub(command.prototype, 'insertOneRole').resolves(queryResult);

      const res = await role.create(payload);
      assert.equal(res.data.roleId, 'admin.test');

      query.prototype.findOneRole.restore();
      command.prototype.insertOneRole.restore();
    });

    it('should return error', async() => {
      sinon.stub(query.prototype, 'findOneRole').resolves(queryResult);

      const res = await role.create(payload);
      assert.notEqual(res.err, null);

      query.prototype.findOneRole.restore();
    });
  });
});

describe('Admin-domain', () => {

  const queryResult = {
    'err': null,
    'data': {
      '_id': '5bac53b45ea76b1e9bd58e1c',
      'username': 'didik',
      'password': 'ewgrewgrew37',
      'role': 'admin.test'
    },
    'message': 'admin successfully created',
    'code': 201
  };

  const payload = {
    'username': 'didik',
    'password': 'ewgrewgrew37',
    'role': 'admin.test'
  };

  const db = {
    setCollection: sinon.stub()
  };

  const admin = new Admin(db);

  before(() => {
    sinon.stub(logger, 'log');
  });

  after(() => {
    logger.log.restore();
  });

  describe('register', () => {

    it('should success register', async () => {
      sinon.stub(query.prototype, 'findOneAdmin').resolves({ data: null });
      sinon.stub(command.prototype, 'insertOneAdmin').resolves(queryResult);

      const res = await admin.register(payload);
      assert.equal(res.data.username, 'didik');
      assert.equal(res.data.role, 'admin.test');

      query.prototype.findOneAdmin.restore();
      command.prototype.insertOneAdmin.restore();
    });

    it('should return error', async () => {
      sinon.stub(query.prototype, 'findOneAdmin').resolves(queryResult);

      const res = await admin.register(payload);
      assert.notEqual(res.err, null);

      query.prototype.findOneAdmin.restore();
    });
  });
});
