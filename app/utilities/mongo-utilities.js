const env = require('../../env.js');

function getDBAddress() {
  let address = 'mongodb://';
  if (env.mongoUser && env.mongoPassword) {
    address +=env.mongoUser + ':' + env.mongoPassword + '@'
  }
  address += env.mongohost + '/' + env.mongoDB;
  return address;
}

module.exports = {
  getDBAddress: getDBAddress
}
