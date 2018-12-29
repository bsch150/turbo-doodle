var express = require('express');
var router = express.Router();

const gameService = require('../services/game-service');
const validator = require('../util/validator');

var START_TIME = new Date();

router.get('/', getGameByIndex);
router.get('/board-html', getGameHtmlByIndex);
router.put('/', makeMoveByIndex);
router.post('/analyze', analyzeBoard);

function getGameByIndex(req, res, next) {
  if (req.query.index) {
    res.json(gameService.getGame(req.query.index));
  } else {
    res.status(500);
    res.send("No index specified.");
  }
}

function getGameHtmlByIndex(req, res, next) {
  if (req.query.index) {
    var game = gameService.getGame(req.query.index);
    if (game) {

      res.send('<html>' + game.getBoardAsHtmlTable() + '</html>');
    } else {

    }
  } else {
    res.status(412);
    res.send('index is a required parameter.');
  }

}

function makeMoveByIndex(req, res, next) {
  console.log(req.body);
  if (req.body.index !== undefined && req.body.x !== undefined && req.body.y !== undefined && req.body.address) {
    var game = gameService.getGame(req.body.index);
    if (!game) {
      res.status(412);
      res.send('Game not found for index ' + req.body.index);
    } else {
      try {
        game.makeMove(req.body.x, req.body.y, game.getPlayerNumByAddress(req.body.address));
        res.json(gameService.getGame(req.body.index));
      } catch (err) {
        res.status(500);
        res.send(err.message);
      }
    }
  } else {
    res.status(412);
    res.send('index, x, y, and address are all requried parameters for this endpoint.');
  }
}

function analyzeBoard(req, res, next) {
  var msg = validator.validateRequiredBodyAttributes(req, ['board', 'playerToAnalyze']);
  if (msg) {
    res.status(412);
    res.send(msg);
    return;
  }
  res.send("OK");
}

module.exports = router;
