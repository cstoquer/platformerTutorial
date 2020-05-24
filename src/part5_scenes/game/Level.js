import game from './game'

const TILE_WIDTH  = settings.tileSize.width
const TILE_HEIGHT = settings.tileSize.height

const EMPTY_TILE = { isEmpty: true }

const TILE_BY_SPRITE = {
	0:  { isSolid: true },
	76: { isEmpty: true, isKill: true }
}

export default class Level {
	constructor() {
		this.logic      = getMap('part5/logic')
		this.background = getMap('part5/background')

		this.width  = this.logic.width  * TILE_WIDTH
		this.height = this.logic.height * TILE_HEIGHT
	}

	render() {
		draw(this.background, 0, 0)
	}

	reset() {
		const entryPoints = this.logic.find(153)
		if (entryPoints.length === 0) {
			console.error('No entry point defined')
			game.player.setPosition(0, 0)
			return
		}
		const entryPoint = entryPoints[0]
		game.player.setPosition(entryPoint.x * TILE_WIDTH, entryPoint.y * TILE_HEIGHT)
	}

	getTileAt(x, y) {
		x = ~~(x / TILE_WIDTH)
		y = ~~(y / TILE_HEIGHT)

		x = clamp(x, 0, this.logic.width  - 1)
		y = clamp(y, 0, this.logic.height - 1)

		var tile = this.logic.get(x, y)
		if (!tile) return EMPTY_TILE
		return TILE_BY_SPRITE[tile.sprite] || EMPTY_TILE
	}
}
