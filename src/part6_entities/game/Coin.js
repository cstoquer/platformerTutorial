import Entity from './Entity'
import game   from './game'

const ANIMATION = [160, 161, 162, 163, 164]

export default class Coin extends Entity {
	constructor() {
		super(8, 8)
		this.animFrame = 0
	}

	update() {
		if (this.collideWith(game.player)) {
			sfx('coin')
			game.entityManager.removeEntity(this)
		}
	}

	render() {
		this.animFrame = (this.animFrame + 0.2) % ANIMATION.length
		sprite(ANIMATION[Math.floor(this.animFrame)], this.x, this.y)
	}
}
