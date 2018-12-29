
module.exports = {
  addPlayer,
  listPlayers,
};

var playerMap = [];

/**
* Register a new player into the engine. Verify all required attributes exist.
*/
function addPlayer(newPlayer) {
  var requiredAttributes = [
    'address'
  ];
  var cleanedPlayer = {};
  requiredAttributes.forEach(verifyAttributeExists);

  playerMap.push(cleanedPlayer);
  return cleanedPlayer;

  function verifyAttributeExists(attr) {
    if (!newPlayer[attr]) {
      throw new Error('New player did not have required attribute: (' + attr + '). Player object:\n' + newPlayer);
    }
    cleanedPlayer[attr] = newPlayer[attr];
  }
}

function listPlayers() {
  return playerMap;
}
