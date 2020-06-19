const Minio = require('minio');
const config = require('../../../infra/configs/global_config');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
const { NotFoundError, ConflictError } = require('../../error/index');

class MinioClient {
  constructor() {
    this.client = new Minio.Client(config.get('/minioConfig'));
    this.ctx = this.constructor.name;
  }

  // async bucketExists(bucketName) {
  //   return new Promise((resolve, reject) => {
  //     this.client.bucketExists(bucketName, (err, exists) => {
  //       if (err) {
  //         logger.log(this.ctx, err.message, 'bucketExists()');
  //         reject(err);
  //       }
  //       resolve(exists ? true : false);
  //     });
  //   });
  // }

  // async makeBucket(bucketName, region = 'us-east-1') {
  //   try {
  //     const isExists = await this.bucketExists(bucketName);
  //     if (isExists) {
  //       return wrapper.data(true);
  //     }
  //     await this.client.makeBucket(bucketName, region);
  //     return wrapper.data(true);
  //   } catch (err) {
  //     logger.log(this.ctx, err.message, 'makeBucket()');
  //     return wrapper.error(new ConflictError(err.message));
  //   }
  // }

  async putObject(bucketName, objectName, buffer = Buffer.from('', 'base64')) {
    try {
      const result = await this.client.putObject(bucketName, objectName, buffer);
      if (result) {
        return wrapper.data(result);
      }
    } catch (err) {
      logger.log(this.ctx, err.message, 'putObject()');
      return wrapper.error(new ConflictError(err.message));
    }
  }

  async fPutObject(bucketName, objectName, filePath) {
    try {
      const result = await this.client.fPutObject(bucketName, objectName, filePath);
      if (result) {
        return wrapper.data(result);
      }
    } catch (err) {
      logger.log(this.ctx, err.message, 'fPutObject()');
      return wrapper.error(new ConflictError(err.message));
    }
  }

  async presignedGetObject(bucketName, objectName, expiry = 604800) {
    try {
      const getUrl = await this.client.presignedGetObject(bucketName, objectName, expiry);
      return wrapper.data(getUrl);
    } catch (err) {
      logger.log(this.ctx, err.message, 'presignedGetObject');
      return wrapper.error(new NotFoundError(err.message));
    }
  }
}

module.exports = MinioClient;

