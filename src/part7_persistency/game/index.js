import Player        from './Player'
import Level         from './Level'
import game          from './game'
import EntityManager from './EntityManager'

game.level         = new Level()
game.player        = new Player()
game.entityManager = new EntityManager()

exports.open = function () {
	paper(15)
	game.level.reset()
}

exports.update = function () {
	game.update()
}
