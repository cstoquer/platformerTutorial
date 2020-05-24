import Entity from './Entity'
import game   from './game'
import state  from './state'

const ANIMATION = [160, 161, 162, 163, 164]

export default class Coin extends Entity {
	constructor(tile) {
		super(8, 8)
		this.animFrame = 0
		this.tile = tile
	}

	update() {
		if (this.collideWith(game.player)) {
			this.collect()
		}
	}

	render() {
		this.animFrame = (this.animFrame + 0.2) % ANIMATION.length
		sprite(ANIMATION[Math.floor(this.animFrame)], this.x, this.y)
	}

	collect() {
		sfx('coin')
		game.entityManager.removeEntity(this)
		state.removeEntity(game.level.id, this.tile)
	}
}
