export default {
	player: null,
	level:  null,
	update: function () {
		this.player.update()

		cls()
		this.level.render()
		this.player.render()
	}
}
