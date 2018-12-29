var express = require('express');
var router = express.Router();

var START_TIME = new Date();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    START_TIME: prettyFormatDate(START_TIME),
    UP_TIME: millisToHoursAndMinutes(new Date() - START_TIME),
  });
});

function prettyFormatDate(date) {
  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
}

function millisToHoursAndMinutes(millis) {
  var numMinutes = millis / 1000 / 60;
  console.log(numMinutes);
  var numHours = numMinutes % 60;
  console.log(numHours);
  var leftOverMinutes = numMinutes - (numHours * 60);
  console.log(leftOverMinutes);
  return numHours + " hours, " + numMinutes + " minutes";
}

module.exports = router;
