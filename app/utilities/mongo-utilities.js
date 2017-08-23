const env = require('../../env.js');

function getDBAddress() {
  return 'mongodb://' + env.mongoUser + ':' + env.mongoPassword + '@' + env.mongohost + '/' + env.mongoDB;
}

module.exports = {
  getDBAddress: getDBAddress
}
