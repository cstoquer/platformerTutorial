import Player from './Player'
import Level  from './Level'
import game   from './game'

game.level  = new Level()
game.player = new Player()

exports.update = function () {
	game.update()
}
