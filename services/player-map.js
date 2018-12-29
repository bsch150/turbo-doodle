
module.exports = {
  addPlayer,
  listPlayers,
};

var playerMap = [];

function addPlayer(newPlayer) {
  var requiredAttributes = [
    'address'
  ];
  requiredAttributes.forEach(verifyAttributeExists);
  playerMap.push(newPlayer);
  return newPlayer;

  function verifyAttributeExists(attr) {
    if (!newPlayer[attr]) {
      throw new Error('New player did not have required attribute: (' + attr + '). Player object:\n' + newPlayer);
    }
  }
}

function listPlayers() {
  return playerMap;
}
