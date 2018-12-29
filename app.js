var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var healthRouter = require('./routes/health-routes');
var playerRouter = require('./routes/player-routes');
var gameRouter = require('./routes/game-routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use('/health', healthRouter);
app.use('/player', playerRouter);
app.use('/game', gameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (req.app.get('env') === 'development') {
    console.log(err);
  }

  // render the error page
  res.status(err.status || 500);
  res.send('Global error handler');
});

module.exports = app;
