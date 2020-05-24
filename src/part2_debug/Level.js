export default class Level {
	constructor() {
		this.map = getMap('part2/level')
	}

	render() {
		draw(this.map, 0, 0)
	}
}
