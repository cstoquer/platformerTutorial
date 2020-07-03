import constants from './constants'
import game from './game'

const TILE_WIDTH  = settings.tileSize.width
const TILE_HEIGHT = settings.tileSize.height

const WALK_ANIMATION_SPRITES = [154, 155, 156]


export default class Player {
	constructor() {
		this.width       = 6
		this.height      = 8
		this.positionX   = 20
		this.positionY   = 160
		this.velocityX   = 0
		this.velocityY   = 0
		this.onGround    = true
		this.jumping     = false
		this.jumpCounter = 0
		this.facingLeft  = false
		this.animFrame   = 0
	}

	startJump() {
		if (!this.onGround) return

		sfx('jump')

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
		this.velocityY = 0
		sfx('land')
	}

	updatePosition() {
		// friction
		this.velocityX *= constants.FRICTION

		// gravity
		if (!this.onGround) {
			this.velocityY += constants.GRAVITY
			this.velocityY = Math.min(this.velocityY, constants.MAX_GRAVITY)
		}

		// level collisions
		let x = this.positionX + this.velocityX
		let y = this.positionY + this.velocityY

		const level = game.level

		// horizontal collisions
		if (this.velocityX !== 0) {
			const front = this.velocityX < 0 ? 0 : this.width

			const topFrontTile    = level.getTileAt(x + front, this.positionY + 1)
			const bottomFrontTile = level.getTileAt(x + front, this.positionY + this.height - 1)

			if (topFrontTile.isSolid || bottomFrontTile.isSolid) {
				this.velocityX = 0
				x = Math.round((x + front) / TILE_WIDTH) * TILE_WIDTH - front
			}
		}

		// vertical collisions
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

		// commit position
		this.positionX = x
		this.positionY = y
	}

	update() {
		// controls
		if (btn.right) { this.velocityX += constants.WALK_ACCELERATION; this.facingLeft = false }
		if (btn.left ) { this.velocityX -= constants.WALK_ACCELERATION; this.facingLeft = true  }
		this.velocityX = clamp(this.velocityX, -constants.MAX_SPEED, constants.MAX_SPEED)

		// jump
		if (btnp.A) this.startJump()
		if (btnr.A) this.endJump()
		if (btn.A)  this.jump()

		this.updatePosition()
	}

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
}
