
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/admin/repositories/queries/query');

describe('findOneRole', () => {

  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'roleId': 'admin.test',
        'roleName': 'Test Role Admin'
      }
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    const result = await query.findOneRole({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.roleId, 'admin.test');
  });

});

describe('findRoleById', () => {

  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'roleId': 'admin.test',
        'roleName': 'Test Role Admin'
      }
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    const result = await query.findRoleById('5bac53b45ea76b1e9bd58e1c');
    assert.notEqual(result.data, null);
    assert.equal(result.data.roleId, 'admin.test');
  });

});

describe('findOneAdmin', () => {

  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'didik',
        'password': 'ewgrewgrew37',
        'role': 'admin.test'
      }
    })
  };

  it('should return success', async () => {
    const query = new Query(db);
    const result = await query.findOneAdmin({});
    assert.notEqual(result.data, null);
    assert.equal(result.data.username, 'didik');
    assert.equal(result.data.role, 'admin.test');
  });

});

describe('findAdminById', () => {

  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'didik',
        'password': 'ewgrewgrew37',
        'role': 'admin.test'
      }
    })
  };

  it('should return success', async () => {
    const query = new Query(db);
    const result = await query.findAdminById('5bac53b45ea76b1e9bd58e1c');
    assert.notEqual(result.data, null);
    assert.equal(result.data.username, 'didik');
    assert.equal(result.data.role, 'admin.test');
  });

});
