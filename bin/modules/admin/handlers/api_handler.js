
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const createRole = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.createRole);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.createRole(result.data);
  };
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    (result.err) ? wrapper.response(res, 'fail', result, null, httpError.CONFLICT)
      : wrapper.response(res, 'success', { data: null }, 'role admin successfully created', http.CREATED);
  };
  sendResponse(await postRequest(validatePayload));
};


const registerAdmin = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.registerAdmin);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.registerAdmin(result.data);
  };
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    (result.err) ? wrapper.response(res, 'fail', result, null, httpError.CONFLICT)
      : wrapper.response(res, 'success', { data: null }, 'admin successfully created', http.CREATED);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  createRole,
  registerAdmin,
};
