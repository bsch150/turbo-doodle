# turbo-doodle
Go game engine

# Writing a Player
Players are pieces of software which communicate with the engine to play Go.

To register a new player, `PUT` a Player object (defined below) to `SERVER_URL/player`.

## Player object
`PUT /player` expects the following input:
```
{
  "address": "URL_TO_PLAYER"
}
```

Where `URL_TO_PLAYER` is the web address of the player software.

## Player Software
A piece of Player software needs the following endpoints (let URL be the configured address of the player):
  - GET /health
  - To be cont.
