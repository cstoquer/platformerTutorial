const TILE_WIDTH  = settings.tileSize.width
const TILE_HEIGHT = settings.tileSize.height

const EMPTY_TILE = { isEmpty: true }
const SOLID_TILE = { isSolid: true }

export default class Level {
	constructor() {
		this.map = getMap('part3/level')
	}

	render() {
		draw(this.map, 0, 0)
	}

	getTileAt(x, y) {
		x = ~~(x / TILE_WIDTH)
		y = ~~(y / TILE_HEIGHT)

		x = clamp(x, 0, this.map.width  - 1)
		y = clamp(y, 0, this.map.height - 1)

		var tile = this.map.get(x, y)
		if (!tile) return EMPTY_TILE
		return SOLID_TILE
	}
}
