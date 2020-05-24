export default class EntityManager {
	constructor() {
		this.entities = []
	}

	reset() {
		this.entities.length = 0
	}

	addEntity(entity) {
		if (this.entities.indexOf(entity) !== -1) {
			DEBUG && console.error('Entity already in pool')
			return
		}
		this.entities.push(entity)
	}

	removeEntity(entity) {
		const index = this.entities.indexOf(entity)
		if (index === -1) {
			DEBUG && console.error('Entity not in pool')
			return
		}
		this.entities.splice(index, 1)
	}

	update() {
		for (let i = this.entities.length - 1; i >= 0; i--) {
			const entity = this.entities[i]
			entity.update && entity.update()
		}
	}

	render() {
		for (let i = this.entities.length - 1; i >= 0; i--) {
			const entity = this.entities[i]
			entity.render && entity.render()
		}
	}
}
