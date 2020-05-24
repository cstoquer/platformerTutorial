const constants = {
	GRAVITY:           0.1,
	MAX_GRAVITY:       2,
	MAX_SPEED:         1,
	WALK_ACCELERATION: 0.1,
	JUMP_ACCELERATION: 2.0,
	JUMP_DURATION:     10,
	FRICTION:          0.9,
	GROUND_LEVEL:      104
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// variables

var positionX   = 60
var positionY   = 104
var velocityX   = 0
var velocityY   = 0
var onGround    = true
var jumping     = false
var jumpCounter = 0

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// jumping

function startJump() {
	if (!onGround) return
	onGround    = false
	jumping     = true
	jumpCounter = 0
}

function jump () {
	if (!jumping) return
	if (jumpCounter++ > constants.JUMP_DURATION) jumping = false
	velocityY = -constants.JUMP_ACCELERATION
}

function endJump() {
	jumping = false
}

function land() {
	onGround  = true
	jumping   = false
	velocityY = 0
	positionY = constants.GROUND_LEVEL
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
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

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Update is called once per frame
exports.update = function () {
	// controls
	if (btn.right) velocityX += constants.WALK_ACCELERATION
	if (btn.left ) velocityX -= constants.WALK_ACCELERATION
	velocityX = clamp(velocityX, -constants.MAX_SPEED, constants.MAX_SPEED)

	// jump
	if (btnp.A) startJump()
	if (btnr.A) endJump()
	if (btn.A)  jump()

	updatePosition()

	// rendering
	cls()
	draw(getMap('part1/ground'), 0, 0)
	sprite(225, positionX, positionY)
}
