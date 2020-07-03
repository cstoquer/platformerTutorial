[< return to main page](https://github.com/cstoquer/platformerTutorial) | [< prev](https://github.com/cstoquer/platformerTutorial/tree/master/src/part3_level) | [next >](https://github.com/cstoquer/platformerTutorial/tree/master/src/part5_scenes)
# Part 4: Animations and polish

In this chapter, we will make the game looks a bit more like a game, by adding graphics, animations and some sound effects.

Compared to the previous chapter, only [`game.js`](https://github.com/cstoquer/platformerTutorial/blob/master/src/part4_animations/game.js), [`Level.js`](https://github.com/cstoquer/platformerTutorial/blob/master/src/part4_animations/Level.js) and [`Player.js`](https://github.com/cstoquer/platformerTutorial/blob/master/src/part4_animations/Player.js) has been modifed.

## Make the camera follow the player


## Level
To make levels more beautifull without adding too much complexity, we used a simple trick: we separate level apparence and logic.
A level is made of two TileMaps:
- a `background` map that contains the graphics to display on screen
- a `logic` map that is not rendered, but used as data to determine the type of tiles (solid or empty).

By doing this way, we don't have to specify the type for every sprites in the tilesheet. TileMaps can be layered in the editor to make sure that they align correctly: simply drag the map from the *assets* panel, onto the *map* panel as demonstrated in this animation:

![mapLayers](https://user-images.githubusercontent.com/2462139/86436473-4b2b3900-bd3d-11ea-8de4-fb13642d8a9a.gif)

Modifications made to the `Level.js` code are straightforward:

```js
export default class Level {
	constructor() {
		this.logic      = getMap('part4/logic')
		this.background = getMap('part4/background')

		this.width  = this.logic.width  * TILE_WIDTH
		this.height = this.logic.height * TILE_HEIGHT
	}

	render() {
		draw(this.background, 0, 0)
	}

	getTileAt(x, y) {
		x = Math.round(x / TILE_WIDTH)
		y = Math.round(y / TILE_HEIGHT)

		x = clamp(x, 0, this.logic.width  - 1)
		y = clamp(y, 0, this.logic.height - 1)

		var tile = this.logic.get(x, y)
		if (!tile) return EMPTY_TILE
		return SOLID_TILE
	}
}
```

## Player
We switch the boring white square for player character sprite and give them a proper sprite and animations. We will use sprites `153`, `154`, `155` and `156` from the default spritesheet.

![character sprites](https://user-images.githubusercontent.com/2462139/86437243-099b8d80-bd3f-11ea-941a-d5cb5fcb6478.png)

Here are the modifications made to the code:

- Added a [`facingLeft`](https://github.com/cstoquer/platformerTutorial/blob/master/src/part4_animations/Player.js#L21) boolean to properly render the character depending on the direction it is facing.
- Added [`animFrame`](https://github.com/cstoquer/platformerTutorial/blob/master/src/part4_animations/Player.js#L22) attribute to control the walking animation
- The bounding box has been reduced a bit to match the sprites used to render the character: `width` is now 6 pixels.
- Modified the [`render`](https://github.com/cstoquer/platformerTutorial/blob/master/src/part4_animations/Player.js#L124-L150) method:

The character has 3 states which renders differently:
- **jumping**: if the character goes upward (`velocityY < 0`) we use sprite `154` otherwise sprite `155`.
- **walking**: the character is animated using sprites `154` to `156`.
- **idle**: the character is on ground and not moving. It is rendered with sprite `153`.

```js
render() {
	const x = this.positionX - 1
	const y = this.positionY

	// jumping
	if (!this.onGround) {
		sprite(this.velocityY < 0 ? 154 : 155, x, y, this.facingLeft)
		return
	}

	// walking
	const isWalking = btn.right || btn.left

	if (isWalking) {
		this.animFrame = (this.animFrame + 0.2)
		if (this.animFrame > WALK_ANIMATION_SPRITES.length) {
			sfx('footsteps')
			this.animFrame = this.animFrame % WALK_ANIMATION_SPRITES.length
		}
		const animationFrame = Math.floor(this.animFrame)
		sprite(WALK_ANIMATION_SPRITES[animationFrame], x, y, this.facingLeft)
		return
	}

	// idle
	sprite(153, x, y, this.facingLeft)
}
```

## Sounds

We also added a few `sfx` commands to play sounds when the character walks, jumps and lands. Sounds are made with *Bleeper*. To open Bleeper editor, from the top menu: `View > Bleeper SFX editor`.
