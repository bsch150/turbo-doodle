const httpUtil = require('../util/http-util');

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

  var cleanedPlayer = cleanPlayer();

  return httpUtil.sendHealthCheck(cleanedPlayer.address)
    .then(function() {
      playerMap.push(cleanedPlayer);
      return cleanedPlayer;
    });

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
