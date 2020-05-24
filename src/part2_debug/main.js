import Player from './Player'
import Level  from './Level'
import game   from './game'
import debug  from './debug'

game.level  = new Level()
game.player = new Player()

exports.update = function () {
	game.update()
}
