const httpUtil = require('../util/http-util');
const logger = require('../util/debug')('player-map', 1);
const gameService = require('../service/game-service');

module.exports = {
  addPlayer,
  listPlayers,
};

var playerMap = [];

/**
* Register a new player into the engine. Verify all required attributes exist.
*/
function addPlayer(newPlayer) {
  //These attributes must exist on the newPlayer to continue.
  var requiredAttributes = [
    'address'
  ];
  requiredAttributes.forEach(verifyAttributeExists);

  //Check for duplicate addresses before adding
  playerMap.forEach(verifyAddressIsNotDuplicate);

  //Remove all attributes that aren't whitelisted
  var cleanedPlayer = cleanPlayer();

  //Verify the player software is healthy
  return httpUtil.sendHealthCheck(cleanedPlayer.address)
    .then(function() {
      playerMap.push(cleanedPlayer);
      return cleanedPlayer;
    }, function(err) {
      logger.error(err);
      throw new Error('Player address did not respond properly. ' +
        'Address: (' + cleanedPlayer.address + ')');
    });

  //Helpers
  function verifyAttributeExists(attr) {
    if (!newPlayer[attr]) {
      throw new Error('New player did not have required attribute: ' +
        '(' + attr + '). Player object:\n' + newPlayer);
    }
  }

  function verifyAddressIsNotDuplicate(existingPlayer) {
    if (existingPlayer.address === newPlayer.address) {
      throw new Error('Player attempted to register with a duplicate address ' +
        '(' + existingPlayer.address + ').');
    }
  }

  function cleanPlayer() {
    var attributesToKeep = [
      'address',
      'nickname'
    ];
    var cleanedPlayerTemp = {};
    attributesToKeep.forEach(handleOne);
    return cleanedPlayerTemp;

    function handleOne(attr) {
      cleanedPlayerTemp[attr] = newPlayer[attr];
    }
  }
}

function listPlayers() {
  return playerMap;
}
