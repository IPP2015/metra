const sinon = require('sinon');

const adminHandler = require('../../../../../bin/modules/admin/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/admin/repositories/commands/command_handler');
const validator = require('../../../../../bin/modules/admin/utils/validator');

describe('User Api Handler', () => {

  const req = {
    body: {}
  };

  const res = {
    send: sinon.stub()
  };

  describe('createRole', () => {
    it('should return error validation', () => {
      adminHandler.createRole(req, res);
    });
    it('should return success', () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: null,
        data: {}
      });
      sinon.stub(commandHandler, 'createRole').resolves({
        err: null,
        data: {}
      });
      adminHandler.createRole(req, res);
      validator.isValidPayload.restore();
      commandHandler.createRole.restore();
    });
  });

  describe('registerAdmin', () => {
    it('should return error validation', () => {
      adminHandler.registerAdmin(req, res);
    });
    it('should return success', () => {
      sinon.stub(validator, 'isValidPayload').resolves({
        err: null,
        data: {}
      });
      sinon.stub(commandHandler, 'registerAdmin').resolves({
        err: null,
        data: {}
      });
      adminHandler.registerAdmin(req, res);
      validator.isValidPayload.restore();
      commandHandler.registerAdmin.restore();
    });
  });
});
