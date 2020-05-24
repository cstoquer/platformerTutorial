const SCREEN_WIDTH  = settings.screen.width
const SCREEN_HEIGHT = settings.screen.height

export default {
	player: null,
	level:  null,
	update: function () {
		this.player.update()

		cls()
		camera(
			clamp(this.player.positionX - 64, 0, this.level.width  - SCREEN_WIDTH),
			clamp(this.player.positionY - 64, 0, this.level.height - SCREEN_HEIGHT)
		)

		this.level.render()
		this.player.render()
	}
}
