import Entity from './Entity'
import Bullet from './Bullet'
import game   from './game'

const FREQUENCY = 120

export default class Cannon extends Entity {
	constructor() {
		super(8, 8)
		this.timer = FREQUENCY;
	}

	update() {
		const player = game.player
		const distance = Math.abs(player.x - this.x)
		if (distance > 8 && distance < 64 && this.timer === 0) {
			this.fire()
		}

		if (--this.timer < 0) this.timer = FREQUENCY
	}

	render() {
	}

	fire() {
		const direction = game.player.x - this.x
		const bullet = new Bullet(direction)
		bullet.x = this.x
		bullet.y = this.y
		game.entityManager.addEntity(bullet)
		sfx('cannon')
	}
}
