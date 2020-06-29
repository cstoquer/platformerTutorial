const TILE_WIDTH  = settings.tileSize.width
const TILE_HEIGHT = settings.tileSize.height

const EMPTY_TILE = { isEmpty: true }
const SOLID_TILE = { isSolid: true }

export default class Level {
	constructor() {
		this.logic      = getMap('part4/logic')
		this.background = getMap('part4/background')

		this.width  = this.logic.width  * TILE_WIDTH
		this.height = this.logic.height * TILE_HEIGHT
	}

	render() {
		draw(this.background, 0, 0)
	}

	getTileAt(x, y) {
		x = Math.floor(x / TILE_WIDTH)
		y = Math.floor(y / TILE_HEIGHT)

		x = clamp(x, 0, this.logic.width  - 1)
		y = clamp(y, 0, this.logic.height - 1)

		var tile = this.logic.get(x, y)
		if (!tile) return EMPTY_TILE
		return SOLID_TILE
	}
}
