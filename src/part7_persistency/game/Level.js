import game   from './game'
import Coin   from './Coin'
import Turtle from './Turtle'
import Cannon from './Cannon'
import state  from './state'
import { getDestination } from './doors'

const TILE_WIDTH  = settings.tileSize.width
const TILE_HEIGHT = settings.tileSize.height

const EMPTY_TILE = { isEmpty: true }

const DOOR_SPRITES = {
	1: 252,
	2: 253,
	3: 254,
	4: 255,
}

const TILE_BY_SPRITE = {
	0:   { isSolid: true },
	134: { isSolid: true },
	76:  { isEmpty: true, isKill: true },
	[DOOR_SPRITES[1]]: { isEmpty: true, isDoor: true, door: 1 },
	[DOOR_SPRITES[2]]: { isEmpty: true, isDoor: true, door: 2 },
	[DOOR_SPRITES[3]]: { isEmpty: true, isDoor: true, door: 3 },
	[DOOR_SPRITES[4]]: { isEmpty: true, isDoor: true, door: 4 },
}

const ENTITY_TYPE_BY_SPRITE = {
	160: Coin,
	135: Turtle,
	134: Cannon
}

export default class Level {
	constructor() {
		this.id         = ''
		this.logic      = null
		this.background = null
		this.width      = 0
		this.height     = 0
	}

	loadLevel(id) {
		this.id = id

		this.logic      = getMap(`part7/${id}/logic`)
		this.background = getMap(`part7/${id}/background`)
		this.width      = this.logic.width  * TILE_WIDTH
		this.height     = this.logic.height * TILE_HEIGHT

		game.entityManager.reset()
		this.createEntities(this.logic)
	}

	render() {
		draw(this.background || this.logic, 0, 0)
	}

	reset() {
		this.loadLevel('level1')
		const entryPoints = this.logic.find(153)
		if (entryPoints.length === 0) {
			console.error('No entry point defined')
			game.player.setPosition(0, 0)
			return
		}
		const entryPoint = entryPoints[0]
		game.player.setPosition(entryPoint.x * TILE_WIDTH, entryPoint.y * TILE_HEIGHT)
	}

	goto(level, door) {
		this.loadLevel(level)
		const startingPoint = this.logic.find(DOOR_SPRITES[door])[0]
		game.player.setPosition(startingPoint.x * TILE_WIDTH, startingPoint.y * TILE_HEIGHT)
	}

	useDoor(door) {
		const destination = getDestination(this.id, door)
		this.goto(destination.level, destination.door)
	}

	createEntities(map) {
		for (let sprite in ENTITY_TYPE_BY_SPRITE) {
			const entities = map.find(parseInt(sprite))
			if (!entities.length) continue

			const EntityClass = ENTITY_TYPE_BY_SPRITE[sprite]

			entities.forEach(tile => {
				if (state.isEntityRemoved(this.id, tile)) return
				const entity = new EntityClass(tile)
				entity.x = tile.x * TILE_WIDTH
				entity.y = tile.y * TILE_HEIGHT
				game.entityManager.addEntity(entity)
			})
		}
	}

	getTileAt(x, y) {
		x = Math.floor(x / TILE_WIDTH)
		y = Math.floor(y / TILE_HEIGHT)

		x = clamp(x, 0, this.logic.width  - 1)
		y = clamp(y, 0, this.logic.height - 1)

		var tile = this.logic.get(x, y)
		if (!tile) return EMPTY_TILE
		return TILE_BY_SPRITE[tile.sprite] || EMPTY_TILE
	}
}
