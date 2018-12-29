const logger = require('../util/debug')('game model', 4);

module.exports = Game;

function Game() {
  var obj = this;

  obj.playerOne;
  obj.playerTwo;
  obj.board;

  obj.generateBoard = generateBoard;
  obj.addPlayer = addPlayer;
  obj.isFull = isFull;

  function generateBoard(size) {
    if (!obj.board) {
      obj.board = [];
      for (var i = 0; i < size; i++) {
        obj.board[i] = [];
        for (var j = 0; j < size; j++) {
          obj.board[i][j] = 0;
        }
      }
    } else {
      throw new Error('Tried to generated a board when one already existed.');
    }
  }

  function addPlayer(player) {
    logger.info('Adding player (' + player.address + ')');
    if (!obj.playerOne) {
      logger.debug('player one: (' + player.address + ')');
      obj.playerOne = player;
    } else if (!obj.playerTwo) {
      logger.debug('player two: (' + player.address + ')');
      obj.playerTwo = player;
    } else {
      throw new Error('Tried to add a player (' + player.address + ') ' +
        ' to a game which already has two players (' + obj.playerOne.address +
        ', ' + obj.playerTwo.address + ').');
    }
  }

  function isFull() {
    return !!obj.playerOne && !!obj.playerTwo;
  }
}
