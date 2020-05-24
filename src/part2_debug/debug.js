import { createDom, createDiv, addCss } from 'pixelbox/domUtils'
import constants from './constants'
addCss(require('./debug.css'))

const debugPanel = createDiv('debugPanel')

function createRange(attribute, min, max, step) {
	const container = createDiv('', debugPanel)
	createDom('label', '', container).innerText = attribute
	const range = createDom('input', '', container)
	const value = createDiv('value', container)
	value.innerText = constants[attribute]

	range.type  = 'range'
	range.min   = min
	range.max   = max
	range.step  = step || 0.1
	range.value = constants[attribute]

	range.oninput = function() {
		constants[attribute] = value.innerText = Number(range.value)
	}
}

createRange('GRAVITY',           0.01, 0.9,  0.01)
createRange('MAX_GRAVITY',       1,    5,    0.1)
createRange('MAX_SPEED',         1,    3,    0.1)
createRange('WALK_ACCELERATION', 0.01, 0.9,  0.01)
createRange('JUMP_ACCELERATION', 0.1,  5,    0.1)
createRange('JUMP_DURATION',     1,    40,   1)
createRange('FRICTION',          0.01, 0.95, 0.01)
