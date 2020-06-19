const commandHandler = require('../../../../../../bin/modules/admin/repositories/commands/command_handler');
const { Role, Admin } = require('../../../../../../bin/modules/admin/repositories/commands/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Role-commandHandler', () => {

  const data = {
    success: true,
    data: null,
    message: 'role admin successfully created',
    code: 201
  };

  const payload = {
    'roleId': 'admin.test',
    'roleName': 'Test Role Admin'
  };

  describe('createRole', () => {

    it('should info success creating role', async() => {
      sinon.stub(Role.prototype, 'create').resolves(data);

      const rs = await commandHandler.createRole(payload);

      assert.equal(rs.message, 'role admin successfully created');
      assert.equal(rs.code, 201);

      Role.prototype.create.restore();
    });
  });
});

describe('Admin-commandHandler', () => {

  const data = {
    success: true,
    data: null,
    message: 'admin successfully created',
    code: 201
  };

  const payload = {
    'username': 'didik',
    'password': 'ewgrewgrew37',
    'role': 'admin.test'
  };

  describe('register', () => {

    it('should info success register', async () => {
      sinon.stub(Admin.prototype, 'register').resolves(data);

      const rs = await commandHandler.registerAdmin(payload);

      assert.equal(rs.message, 'admin successfully created');
      assert.equal(rs.code, 201);

      Admin.prototype.register.restore();
    });
  });
});
