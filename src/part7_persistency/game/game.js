const SCREEN_WIDTH  = settings.screen.width
const SCREEN_HEIGHT = settings.screen.height

export default {
	level:         null,
	player:        null,
	entityManager: null,

	update: function () {
		this.player.update()
		this.entityManager.update()

		cls()
		camera(
			clamp(this.player.x - 64, 0, this.level.width  - SCREEN_WIDTH),
			clamp(this.player.y - 64, 0, this.level.height - SCREEN_HEIGHT)
		)

		this.level.render()
		this.entityManager.render()
		this.player.render()
	}
}
