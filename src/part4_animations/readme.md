# Part 4: Animations and polish
In this chapter, we will make the game looks a bit more like a game, by adding graphics, animations and some sound effects.

From last chapter, only `Level.js` and `Player.js` has been modifed.

## Level
A level is now separated in two TileMaps:
- a `background` map that contains the graphics to display on screen
- a `logic` map that is used as data to determine which tile is solid or empty.


## Player
- Added `facingLeft` boolean to render properly the character if it is moving right or left
- Added `animFrame` attribute to control the running animation
- The bounding box has been reduced a bit to match the sprites we are using to render the character.
- Modified the `render` method
- Added few `sfx` commands to play sounds when the character walks, jumps and lands. Sounds are made with Bleeper.

```js
render() {
	const x = this.positionX - 1
	const y = this.positionY

	if (!this.onGround) {
		sprite(this.velocityY < 0 ? 154 : 155, x, y, this.facingLeft)
		return
	}

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

	sprite(153, x, y, this.facingLeft)
}
```


