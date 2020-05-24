import intro from './intro'
import game  from './game'
import over  from './over'

export default {
	scenes: { intro, game, over },
	update: null,
	activeScene: null,
	open: function (sceneId, ...args) {
		const scene = this.scenes[sceneId]
		if (!scene) return console.error('Scene does not exist', sceneId)
		this.activeScene = scene
		this.update = scene.update
		scene.open && scene.open(...args)
	}
}
