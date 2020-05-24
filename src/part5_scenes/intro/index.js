import scenes from '../scenes'

function open() {
	paper(0).cls()
	locate(5, 7).pen(1).print('SUPER PLATFORMER GAME')
	locate(4, 19).pen(11).print('PRESS `ACTION` to START')
}

function update() {
	if (btnp.A) {
		scenes.open('game')
	}
}

export default {
	open,
	update,
}
