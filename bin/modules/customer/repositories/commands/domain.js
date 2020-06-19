const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const commonUtil = require('../../../../helpers/utils/common');
const { ConflictError, InternalServerError} = require('../../../../helpers/error');
const algorithm = 'aes-256-ctr';
const secretKey = 'Dom@in2018';

class Customer {
  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async register(payload){
    const { mobileNumber, pin, name} = payload;
    const customer = await this.query.findOneCustomer({mobileNumber});
    if (customer.err instanceof InternalServerError){
      return wrapper.error(new InternalServerError ('internal server error'));
    }

    if (customer.data){
      return wrapper.error(new ConflictError('mobile number already exist'));
    }

    const chiperPwd = await commonUtil.encrypt(pin,algorithm,secretKey);
    const data = {
      mobileNumber,
      pin: chiperPwd,
      name
    };
    const { data:result } = await this.command.insertOneCustomer(data);
    return wrapper.data(result);
  }
}
module.exports = Customer;
