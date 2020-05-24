# Part 3: Level collisions

In this part, we will implement collision between player character and tiles.

From the previous chapter, only 3 things have changed:
- Added a `getTileAt` method in `Level.js`
- Added 2 new attributes to `Player`: `width` and `height` to control the size of the bounding box of the player character.
- Modified `updatePosition` method of `Player.js`

## Level.getTileAt
This method return the tile property at a specific pixel position. For now, we have only two types of tiles:
- Solid tile: Character cannot enter in these tiles, and can walk on it.
- Empty tile: Character can move freely in these tiles.

## Collision detection

todo

## Collision solving

todo
