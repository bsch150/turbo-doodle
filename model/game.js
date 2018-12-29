const logger = require('../util/debug')('game model', 4);

module.exports = Game;

function Game() {
  var obj = this;

  obj.playerOne; //represented by 1
  obj.playerTwo; //represented by -1
  obj.board;
  obj.currentTurn = 1;

  obj.addPlayer = addPlayer;
  obj.isFull = isFull;
  obj.readyToSend = readyToSend;
  obj.makeMove = makeMove;
  obj.getPlayerNumByAddress = getPlayerNumByAddress;
  obj.getBoardAsHtmlTable = getBoardAsHtmlTable;

  function getPlayerNumByAddress(address) {
    if (obj.playerOne.address === address) {
      return 1;
    } else if (obj.playerTwo.address === address) {
      return -1;
    } else {
      return 0; //Invalid
    }
  }

  function makeMove(x, y, playerNum) {
    logger.debug('Player ' + playerNum + ' making a move: (' + x + ', ' + y + ')');
    if (obj.currentTurn === playerNum) {
      if (obj.board[x][y] !== 0) {
        throw new Error('Player ' + playerNum + ' tried to move to an occupied space.');
      }
      obj.board[x][y] = playerNum;
      obj.currentTurn = (obj.currentTurn === 1 ? -1 : 1);
    } else {
      throw new Error('player ' + playerNum + ' attempted to make a move out of turn.');
    }
  }

  function generateBoard(size) {
    logger.info('Generating board of size ' + size);
    obj.currentTurn = 1;
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
    if (!obj.board) {
      generateBoard(9);
    }
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

  function readyToSend() {
    return obj.playerOne && obj.playerTwo &&
      obj.playerOne.address && obj.playerTwo.address;
  }

  function isFull() {
    return !!obj.playerOne && !!obj.playerTwo;
  }

  function getBoardAsHtmlTable() {
    var str = "<table>"
    obj.board.forEach(function(row) {
      str += "<tr>"
      row.forEach(function(col) {
        str += "<td style=\"" + (getStlyeForPlayerNum(col)) + "\"></td>";
      });
      str += "</tr>"
    });
    return str + "</table>";

    function getStlyeForPlayerNum(num) {
      var str = "width:20px; height:20px;"
      if (num === 1) {
        return str + "background-color: red;";
      }
      if (num === -1) {
        return str + "background-color: blue;";
      }
      if (num === 0) {
        return str + "background-color: lightgrey;";
      }
    }
  }
}
