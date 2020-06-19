const joi = require('joi');
const validate = require('validate.js');
const wrapper = require('../../../helpers/utils/wrapper');
const { UnprocessableEntityError } = require('../../../helpers/error');


const isValidPayload = (payload, constraint) => {
  const { value, error } = joi.validate(payload, constraint);
  if(!validate.isEmpty(error)){
    const errorMessage = error.details ? error.details[0].message : error.message;
    return wrapper.error(new UnprocessableEntityError(errorMessage));
  }
  return wrapper.data(value, 'success', 200);

};

module.exports = {
  isValidPayload
};
