const joi = require('joi');

const login = joi.object({
  mobileNumber: joi.string().required(),
  pin: joi.string().required(),
  name: joi.string().required()
});

module.exports = {
  login
};
