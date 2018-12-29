const request = require('request');
const q = require('q');

const logger = require('./debug')('http-util', 4);

module.exports = {
  sendHealthCheck,
};

function sendHealthCheck(address) {
  return wrapRequestInPromise("GET", address + "/health");
}

function wrapRequestInPromise(method, url, body) {
  var def = q.defer();
  var obj = {
    method,
    uri: url
  };
  if (body) {
    obj.body = body;
  }

  logger.info("Sending (" + method + ") request to " + "(" + url + ")")


  request(obj)
    .on('response', function(response) {
      logger.debug(JSON.stringify(response));
      logger.debug(response.statusCode);

      if (response.statusCode == 200) {
        logger.debug("WHAT");
        if (response.data) {
          logger.info(response.data);
        }
        def.resolve(response.data);
      } else {
        logger.error(response.statusMessage);
        def.reject(response.statusMessage);
      }
    })
    .on('error', function(err) {
      logger.error(err);
      def.reject(err);
    });

  return def.promise;
}
