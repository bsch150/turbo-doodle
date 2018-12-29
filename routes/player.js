var express = require('express');
var router = express.Router();

var playerMap = require('../services/player-map');

router.put('/', registerPlayer);
router.get('/', listPlayers);

function registerPlayer(req, res, next) {
  if (!req.body.newPlayer) {
    res.status(500);
    res.send('New Player not defined');
    return;
  }
  res.json(playerMap.addPlayer(req.body.newPlayer));
}

function listPlayers(req, res, next) {
  res.json(playerMap.listPlayers());
}

module.exports = router;
