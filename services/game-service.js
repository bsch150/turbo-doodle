const Game = require('../model/game');
const logger = require('../util/debug')('game-service', 4);

module.exports = {
  analyzeBoard,
  initGameForPlayer,
};

var games = [];

var tempGame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function initGameForPlayer(player) {
  if (games.length === 0 || games[games.length - 1].isFull()) {
    pushNewGame();
  }
  games[games.length - 1].addPlayer(player);
}

function pushNewGame() {
  var game = new Game();
  games.push(game);
  logger.info('Adding new game to the list. No. games: (' + games.length + ')');
}

//TODO func addPlayerToGame

function getGame(index) {
  return games[index];
}
// analyzeBoard([[]], 1)
// analyzeBoard([[]], -1)
function analyzeBoard(board, playerToAnalyze) {
  //TODO remove pieces matching playerToAnalyze
}
