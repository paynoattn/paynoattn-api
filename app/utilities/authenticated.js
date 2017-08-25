const env = require('../../env');

module.exports = (requestBody) => {
  return requestBody['userName'] === env.postUserName && requestBody['password'] === env.postPassword;
}
