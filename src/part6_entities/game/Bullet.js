import Entity from './Entity'
import game   from './game'

const SPEED = 1
const BOUNCE_BACK = 3

export default class Cannonball extends Entity {
	constructor(direction) {
		super(8, 8)
		this.vx = direction > 0 ? SPEED : -SPEED
	}

	update() {
		const player = game.player
		if (this.collideWith(player)) {
			if (player.vy > 0) {
				this.kill()
				player.vy = -BOUNCE_BACK;
			} else {
				player.kill()
			}
		}

		const collisions = this.resolveLevelCollision(game.level)
		if (collisions.front) {
			game.entityManager.removeEntity(this)
		}
	}

	render() {
		sprite(134, this.x, this.y, this.vx < 0)
	}

	kill() {
		game.entityManager.removeEntity(this)
		sfx('stomp')
	}
}
