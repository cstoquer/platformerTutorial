const TILE_WIDTH  = settings.tileSize.width
const TILE_HEIGHT = settings.tileSize.height

export default class Entity {
	constructor(width, height) {
		this.w        = width  || TILE_WIDTH
		this.h        = height || TILE_HEIGHT
		this.x        = 0
		this.y        = 0
		this.vx       = 0
		this.vy       = 0
		this.onGround = true

		this._collisions = {
			top:    false,
			bottom: false,
			front:  false
		}
	}

	setPosition(x, y) {
		this.x = x
		this.y = y
	}

	resolveLevelCollision(level) {
		const collisions = this._collisions
		collisions.top    = false
		collisions.bottom = false
		collisions.front  = false

		let x = this.x + this.vx
		let y = this.y + this.vy

		// horizontal collisions
		if (this.vx !== 0) {
			const front = this.vx < 0 ? 0 : this.w

			const topFrontTile    = level.getTileAt(x + front, this.y + 1)
			const bottomFrontTile = level.getTileAt(x + front, this.y + this.h - 1)

			if (topFrontTile.isSolid || bottomFrontTile.isSolid) {
				x = Math.round((x + front) / TILE_WIDTH) * TILE_WIDTH - front
				collisions.front = true
			}
		}

		// vertical collisions
		if (this.onGround) {
			// check if there is still floor underneath
			const tileDL = level.getTileAt(x + 1, y + this.h + 1)
			const tileDR = level.getTileAt(x + this.w - 2, y + this.h + 1)
			if (tileDL.isEmpty && tileDR.isEmpty) this.onGround = false
		} else if (this.vy > 0) {
			// falling
			const tileDL = level.getTileAt(x + 1, y + this.h)
			const tileDR = level.getTileAt(x + this.w - 2, y + this.h)
			if (tileDL.isSolid || tileDR.isSolid) {
				y = Math.round(y / TILE_HEIGHT) * TILE_HEIGHT
				collisions.bottom = true
			}
		} else if (this.vy < 0) {
			// jumping upward. Check for ceiling collision
			const tileUL = level.getTileAt(x + 1, y)
			const tileUR = level.getTileAt(x + this.w - 2, y)
			if (tileUL.isSolid || tileUR.isSolid) {
				y = Math.round(y / TILE_HEIGHT) * TILE_HEIGHT
				collisions.top = true
			}
		}

		// commit position
		this.x = x
		this.y = y

		return collisions
	}

	collideWith(entity) {
		return (
			this.x < entity.x + entity.w &&
			this.y < entity.y + entity.h &&
			entity.x < this.x + this.w &&
			entity.y < this.y + this.h
		)
	}
}
