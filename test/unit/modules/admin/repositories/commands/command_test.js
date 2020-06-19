const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/admin/repositories/commands/command');

describe('Role-command', () => {

  describe('insertOneRole', () => {
    const queryResult = {
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'roleId': 'admin.test',
        'roleName': 'Test Role Admin'
      }
    };

    it('should success to insert data to db', async() => {

      const db = {
        insertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.insertOneRole({});
      assert.equal(res.data.roleId, queryResult.data.roleId);
    });
  });

});

describe('Admin-command', () => {

  describe('insertOneAdmin', () => {
    const queryResult = {
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'didik',
        'password': 'ewgrewgrew37',
        'role': 'admin.test'
      }
    };

    it('should success to insert data to db', async () => {

      const db = {
        insertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db);
      const res = await command.insertOneAdmin({});
      assert.equal(res.data.username, queryResult.data.username);
      assert.equal(res.data.role, queryResult.data.role);
    });
  });

});
