import Entity    from './Entity'
import constants from './constants'
import game      from './game'
import scenes    from '../scenes'

const WALK_ANIMATION_SPRITES = [154, 155, 156]

export default class Player extends Entity {
	constructor() {
		super(6, 8)
		this.jumping     = false
		this.jumpCounter = 0
		this.facingLeft  = false
		this.animFrame   = 0
	}

	startJump() {
		if (!this.onGround) return
		this.onGround    = false
		this.jumping     = true
		this.jumpCounter = 0
		sfx('jump')
	}

	jump() {
		if (!this.jumping) return
		if (this.jumpCounter++ > 20) this.jumping = false
		this.vy = -constants.JUMP_ACCELERATION + this.jumpCounter * 0.08
	}

	endJump() {
		this.jumping = false
	}

	land() {
		this.onGround = true
		this.jumping  = false
		this.vy       = 0
		sfx('land')
	}

	kill() {
		scenes.open('over')
	}

	getActiveTile() {
		return game.level.getTileAt(this.x + 3, this.y + 4)
	}

	updatePosition() {
		// friction
		this.vx *= constants.FRICTION

		// gravity
		if (!this.onGround) {
			this.vy += constants.GRAVITY
			this.vy = Math.min(this.vy, constants.MAX_GRAVITY)
		}

		// level collisions
		const collisions = this.resolveLevelCollision(game.level)

		if (collisions.front)  this.vx = 0
		if (collisions.bottom) this.land()
		if (collisions.top)    this.endJump()
	}

	update() {
		// controls
		if (btn.right) { this.vx += constants.WALK_ACCELERATION; this.facingLeft = false }
		if (btn.left)  { this.vx -= constants.WALK_ACCELERATION; this.facingLeft = true  }
		this.vx = clamp(this.vx, -constants.MAX_SPEED, constants.MAX_SPEED)

		// jump
		if (btnp.A) this.startJump()
		if (btnr.A) this.endJump()
		if (btn.A)  this.jump()

		this.updatePosition()
		const activeTile = this.getActiveTile()

		if (activeTile.isKill) this.kill()
		if (this.y > game.level.height + 20) {
			sfx('pitfall')
			this.kill()
		}

		if (btnp.up && activeTile.isDoor) {
			game.level.useDoor(activeTile.door)
			sfx('door')
		}
	}

	render() {
		const x = this.x - 1
		const y = this.y

		if (!this.onGround) {
			sprite(this.vy < 0 ? 154 : 155, x, y, this.facingLeft)
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
}
