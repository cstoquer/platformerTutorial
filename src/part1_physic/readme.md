[< return to main page](https://github.com/cstoquer/platformerTutorial)
# Part 1: Basic physic

This part implement simple physic for the player's character movements:
- move right and left with arrow keys
- jump and fall from gravity
- for now, ground level is just an harcoded value

Character position is defined by 2 variables: `positionX` and `positionY`. To keep things simple, unit is in pixel. To move the character, we don't modify the position directly but apply forces (also called acceleration). Gravity that make character fall down is also a force that is applied downward when the character is not on ground.

For that we need to define few other variables:
- `velocityX` and `velocityY`: the current speed of the character on `x` and `y` axis.
- `onGround`: a boolean to store if the character is in contact with the ground or not.

When we press left and right button, we modify the `velocityX` value by a constant `WALK_ACCELERATION`. We don't want the velocity to increase to infinity, so we also have a `MAX_SPEED` constant to clamp the velocity.

```js
if (btn.right) velocityX += constants.WALK_ACCELERATION
if (btn.left ) velocityX -= constants.WALK_ACCELERATION
velocityX = clamp(velocityX, -constants.MAX_SPEED, constants.MAX_SPEED)
```

To update character's position, we simply increase `position` variables by `velocity`. This is defined in the `updatePosition` function:

```js
function updatePosition() {
	// friction
	velocityX *= constants.FRICTION

	// gravity
	if (!onGround) {
		velocityY += constants.GRAVITY
		velocityY = Math.min(velocityY, constants.MAX_GRAVITY)
	}

	// apply forces
	positionX += velocityX
	positionY += velocityY

	// collisions with ground
	if (velocityY > 0 && positionY >= constants.GROUND_LEVEL) {
		land()
	}
}
```

Few things to note in this function:
- velocity is reduced by a `FRICTION` ratio. This allow the character to progressively stop when the arrow key is released
- Whe the character is not on ground, a `GRAVITY` acceleration is applied to `velocityY`
- When the character touch the ground after a jump, we call a `land()` function to put it back on the ground.

## Jump
In platformers, the jump is one of the most important aspect that differentiate a game from another. The game feel is greatly impacted by how the jump is implemented. There is a lot of different way to implement jump. But in this tutorial, we'll do something simple.

The jump action is separated in 4 functions:
- `startJump` called when we press the jump button (spacebar)
- `jump` called as long as we press the jump button. This allow the player to control the length of the jump. Since we don't want the character to jump infinitely, we added a `jumpCounter` to control the maximum duration of the jump.
- `endJump` called when the player release the jump button
- `land` called when the character fall back on the ground

## Rendering
Lastly, the character is simply rendered a white square sprite (sprite 225 in the default tilesheet) on top of the background map:
```js
cls()
draw(getMap('part1/ground'), 0, 0)
sprite(225, positionX, positionY)
```
