import scenes from '../scenes'

function open() {
	setTimeout(() => {
		paper(0).cls()
		locate(11,  9).pen(9).print('GAME OVER')
		locate(4,  19).pen(11).print('PRESS `ACTION` to RETRY')
	}, 0)
}

function update() {
	if (btnp.A) {
		scenes.open('game')
		return
	}
}

export default {
	open,
	update,
}
