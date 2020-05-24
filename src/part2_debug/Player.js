import constants from './constants'

export default class Player {
	constructor() {
		this.positionX   = 60
		this.positionY   = constants.GROUND_LEVEL
		this.velocityX   = 0
		this.velocityY   = 0
		this.onGround    = true
		this.jumping     = false
		this.jumpCounter = 0
	}

	startJump() {
		if (!this.onGround) return
		this.onGround    = false
		this.jumping     = true
		this.jumpCounter = 0
	}

	jump () {
		if (!this.jumping) return
		if (this.jumpCounter++ > 20) this.jumping = false
		this.velocityY = -constants.JUMP_ACCELERATION + this.jumpCounter * 0.08
	}

	endJump() {
		this.jumping = false
	}

	land() {
		this.onGround  = true
		this.jumping   = false
		this.velocityY    = 0
		this.positionY = constants.GROUND_LEVEL
	}

	updatePosition() {
		// friction
		this.velocityX *= constants.FRICTION

		// gravity
		if (!this.onGround) {
			this.velocityY += constants.GRAVITY
			this.velocityY = Math.min(this.velocityY, constants.MAX_GRAVITY)
		}

		// apply forces
		this.positionX = this.positionX + this.velocityX
		this.positionY = this.positionY + this.velocityY

		// collisions with ground
		if (this.velocityY > 0 && this.positionY >= constants.GROUND_LEVEL) {
			this.land()
		}
	}

	update() {
		// controls
		if (btn.right) this.velocityX += constants.WALK_ACCELERATION
		if (btn.left ) this.velocityX -= constants.WALK_ACCELERATION
		this.velocityX = clamp(this.velocityX, -constants.MAX_SPEED, constants.MAX_SPEED)

		// jump
		if (btnp.A) this.startJump()
		if (btnr.A) this.endJump()
		if (btn.A)  this.jump()

		this.updatePosition()
	}

	render() {
		sprite(225, this.positionX, this.positionY)
	}
}
