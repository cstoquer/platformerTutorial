import Entity from './Entity'
import game   from './game'

const ANIMATION   = [135, 136]
const SPEED       = 0.2
const BOUNCE_BACK = 3

export default class Turtle extends Entity {
	constructor(tile) {
		super(8, 8)
		this.animFrame = 0
		this.vx = tile.flipH ? -SPEED : SPEED
	}

	update() {
		const front = this.vx < 0 ? -1 : this.w + 1

		if (game.level.getTileAt(this.x + front, this.y + this.h + 4).isEmpty) {
			this.vx *= -1
		}

		const collisions = this.resolveLevelCollision(game.level)
		if (collisions.front) this.vx *= -1

		const player = game.player
		if (this.collideWith(player)) {
			if (player.vy > 0) {
				this.kill()
				player.vy = -BOUNCE_BACK;
			} else {
				player.kill()
			}
		}
	}

	render() {
		this.animFrame = (this.animFrame + 0.1) % ANIMATION.length
		sprite(ANIMATION[Math.floor(this.animFrame)], this.x, this.y, this.vx < 0)
	}

	kill() {
		game.entityManager.removeEntity(this)
		sfx('stomp')
	}
}
