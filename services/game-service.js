const Game = require('../model/game');
const httpUtil = require('../util/http-util');
const logger = require('../util/debug')('game-service', 4);

module.exports = {
  analyzeBoard,
  initGameForPlayer,
  getGame,
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
  logger.debug('Initializing game for player (' + player.address + ')');
  if (games.length === 0 || getLastIndex().isFull()) {
    pushNewGame();
  }
  getLastIndex().addPlayer(player);
  if (getLastIndex().isFull()) {
    startGame(getLastIndex());
  }
}

function pushNewGame() {
  var game = new Game();
  games.push(game);
  logger.info('Adding new game to the list. No. games: (' + games.length + ')');
}

function startGame(game) {
  httpUtil.sendGameState(game);
}

function getLastIndex() {
  return games[games.length - 1];
}

function getGame(index) {
  return games[index];
}
// analyzeBoard([[]], 1)
// analyzeBoard([[]], -1)
function analyzeBoard(board, playerToAnalyze) {
  //TODO remove pieces matching playerToAnalyze
}
