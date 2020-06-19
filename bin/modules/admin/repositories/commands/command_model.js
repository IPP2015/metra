const joi = require('joi');

const createRole = joi.object({
  roleId: joi.string().required(),
  roleName: joi.string().required(),
});

const registerAdmin = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().required(),
});

module.exports = {
  createRole,
  registerAdmin,
};
