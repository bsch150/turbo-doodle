var express = require('express');
var router = express.Router();

var playerMap = require('../services/player-map');
var logger = require('../util/debug')('player-routes', 2);

router.put('/', registerPlayer);
router.get('/', listPlayers);

function registerPlayer(req, res, next) {
  if (!req.body.newPlayer) {
    res.status(500);
    res.send('New Player not defined');
    return;
  }
  try {
    playerMap.addPlayer(req.body.newPlayer)
      .then(function(addedPlayer) {
        res.json(addedPlayer);
        return;
      })
      .catch(function(error) {
        logger.error(error);
        res.status(500);
        res.send('There was a problem adding the player.');
        return;
      });
  } catch (err) {
    logger.warn(err);
    res.status(412);
    res.send(err.message);
  }
}

function listPlayers(req, res, next) {
  res.json(playerMap.listPlayers());
}

module.exports = router;
