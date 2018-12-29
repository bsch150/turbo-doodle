const request = require('request');
const q = require('q');

const logger = require('./debug')('http-util', 4);

module.exports = {
  sendHealthCheck,
  sendGameState,
};

function sendGameState(game) {
  if (game.readyToSend()) {
    logger.info('Sending game info to (' + game.playerOne.address + ', ' +
      game.playerTwo.address + ')');

    sendGameStateToAddress(game.playerOne.address, game);
    sendGameStateToAddress(game.playerTwo.address, game);
  } else {
    throw new Error('Game was missing information to send.');
  }

  function sendGameStateToAddress(address, game) {
    return wrapRequestInPromise("POST", address + "/game-state", game)
  }
}

function sendHealthCheck(address) {
  return wrapRequestInPromise("GET", address + "/health");
}

function wrapRequestInPromise(method, url, body) {
  var def = q.defer();
  var obj = {
    method,
    uri: url,
    json: true,
  };
  if (body) {
    var stringBody = JSON.stringify(body);
    logger.info(stringBody);
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
