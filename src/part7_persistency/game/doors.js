const DOORS = {}

function addLink(levelA, doorA, levelB, doorB) {
	if (!DOORS[levelA]) DOORS[levelA] = {}
	if (!DOORS[levelB]) DOORS[levelB] = {}
	DOORS[levelA][doorA] = { level: levelB, door: doorB}
	DOORS[levelB][doorB] = { level: levelA, door: doorA}
}

addLink('level1', 1, 'level2', 1)
addLink('level1', 2, 'level2', 2)


export function getDestination(level, door) {
	return DOORS[level][door]
}
