[< return to main page](https://github.com/cstoquer/platformerTutorial) | [< prev](https://github.com/cstoquer/platformerTutorial/tree/master/src/part2_debug) | [next >](https://github.com/cstoquer/platformerTutorial/tree/master/src/part4_animations)
# Part 3: Level collisions

In this part, we will implement collision between player character and tiles.

From the previous chapter, only 3 things have changed:
- We added a [`getTileAt`](https://github.com/cstoquer/platformerTutorial/blob/master/src/part3_level/Level.js#L16-L26) method in `Level.js`
- We added 2 new attributes to `Player`: `width` and `height` to control the size of the bounding box of the player character.
- We modified `updatePosition` method of `Player.js`

## Level.getTileAt
This method return the tile property at a specific pixel position. For simplicity, we have only two types of tiles:
- Solid tile: Character cannot enter in these tiles, and can walk on it.
- Empty tile: Character can move freely in these tiles.

The way this work is very simple: we convert pixel coordinate to tile coordinate, by dividing the `x` and `y` values by the tile size. We round the value to an integer and clamp it inside the bounds of the level's `map`. Then `TileMap.get` is used to get the tile at this position. If there is no tile, we return the **empty tile** type, else the **solid tile** type.

```js
getTileAt(x, y) {
	x = Math.round(x / TILE_WIDTH)
	y = Math.round(y / TILE_HEIGHT)

	x = clamp(x, 0, this.map.width  - 1)
	y = clamp(y, 0, this.map.height - 1)

	var tile = this.map.get(x, y)
	if (!tile) return EMPTY_TILE
	return SOLID_TILE
}
```

## Collision detection

The player-to-tile collision detection and solving is implemented in the [`updatePosition`](https://github.com/cstoquer/platformerTutorial/blob/master/src/part3_level/Player.js#L43-L99) method of `Player`. For this, we need to give the player a size by adding two properties `width` and `height`. The `positionX` and `positionY` attributes of the player will be the top-left corner of its bounding box. When the player is moving, we need to test several points around its bounding box. We call these points "hot-spots". Since the player is not bigger than one tile, we only need to define 8 hot-spots:

```
           up-left     up-right
            +-▓▓----------▓▓-+
   back-top ▓▓              ▓▓ front-top
            |                |
            |                |
            |      --->      |
            |                |
back-bottom ▓▓              ▓▓ front-bottom
            +-▓▓----------▓▓-+
          down-left     down-right
```

Notice how we offset slightly each hot-spots from the corners of the bounding box. We do this in order to have the player "slide" nicely and not get stuck around tiles. The front and back hot-spots are defined by the direction in which the player is going. Front and back are inversed when the player is going in the opposite direction. We will actually never use the **back** hot-spots.

Which hot-spots need to be tested depends on the state and direction the player is currently moving:
 - if the player is jumping upward, test **front** and  **up** hot-spots.
 - if the player is falling downward, test **front** and **down** hot-spots.
 - if the player is on the ground, test **front** hot-spots, and also test **down** hot-spots to see if there is still some ground under player's feet.

## Collision solving

After moving the player according to its velocity, we calculate the coordinate of each hot-spots that needs to be tested, and call `Level.getTileAt` to get the type of tile in contact with this hot-spot (this can be either `EMPTY_TILE` or `SOLID_TILE`). Depending on the type of tile that we get in return, we can correct the player position and state, so that its bounding box doesn't overlap with a solid tile.

This process is done in two parts: first horizontally, then vertically.

#### Horizontally
This is the collision with wall. We only need to test the 2 front hot-spots.

```js
if (this.velocityX !== 0) {
	const front = this.velocityX < 0 ? 0 : this.width

	const topFrontTile    = level.getTileAt(x + front, this.positionY + 1)
	const bottomFrontTile = level.getTileAt(x + front, this.positionY + this.height - 1)

	if (topFrontTile.isSolid || bottomFrontTile.isSolid) {
		this.velocityX = 0
		x = Math.round((x + front) / TILE_WIDTH) * TILE_WIDTH - front
	}
}
```

#### Vertically
There are 3 differents cases to check:
 - player is on the ground -> check that there is still floor under their feet.
 - player is jumping upward -> test top hot-spot for ceilling collision.
 - player is falling downward -> test bottom hot-spot for floor collision.

```js
if (this.onGround) {
	// check if there is still floor underneath
	const tileDL = level.getTileAt(x + 1,              y + this.height + 1)
	const tileDR = level.getTileAt(x + this.width - 2, y + this.height + 1)
	if (tileDL.isEmpty && tileDR.isEmpty) this.onGround = false
} else if (this.velocityY > 0) {
	// falling
	const tileDL = level.getTileAt(x + 1,              y + this.height)
	const tileDR = level.getTileAt(x + this.width - 2, y + this.height)
	if (tileDL.isSolid || tileDR.isSolid) {
		this.land()
		y = Math.round(y / TILE_HEIGHT) * TILE_HEIGHT
	}
} else if (this.velocityY < 0) {
	// jumping upward. Check for ceiling collision
	const tileUL = level.getTileAt(x + 1,              y)
	const tileUR = level.getTileAt(x + this.width - 2, y)
	if (tileUL.isSolid || tileUR.isSolid) {
		this.endJump()
		y = Math.round(y / TILE_HEIGHT) * TILE_HEIGHT
	}
}
```
