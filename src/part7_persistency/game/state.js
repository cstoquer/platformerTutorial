export default {
	level: 0,
	door:  1,
	death: 0,
	removedEntities: {},

	reset: function () {
		this.level = 0
		this.door  = 1
		this.deat  = 0
		this.removedEntities = {}
	},

	setCheckpoint: function (level, door) {
		this.level = level
		this.door  = door
	},

	getEntityId: function (levelId, tile) {
		return `${levelId}:${tile.x}:${tile.y}`
	},

	removeEntity: function (levelId, tile) {
		this.removedEntities[this.getEntityId(levelId, tile)] = true
	},

	isEntityRemoved: function (levelId, tile) {
		return !!this.removedEntities[this.getEntityId(levelId, tile)]
	}
}
