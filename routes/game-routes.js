var express = require('express');
var router = express.Router();

const validator = require('../util/validator');

var START_TIME = new Date();

router.post('/analyze', analyzeBoard);

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
