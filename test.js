const gameService = require('./services/game-service');

function test() {
  gameService.initGameForPlayer({
    address: 'http://localhost:5000'
  });
  gameService.initGameForPlayer({
    address: 'http://localhost:5000'
  });
  gameService.initGameForPlayer({
    address: 'http://localhost:5000'
  });
}

test();
