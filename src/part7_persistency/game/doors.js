const DOORS = {}

function addLink(levelA, doorA, levelB, doorB) {
	if (!DOORS[levelA]) DOORS[levelA] = {}
	if (!DOORS[levelB]) DOORS[levelB] = {}
	DOORS[levelA][doorA] = { level: levelB, door: doorB}
	DOORS[levelB][doorB] = { level: levelA, door: doorA}
}

addLink('level1', 1, 'level2', 1)
addLink('level2', 2, 'level3', 1)
addLink('level3', 2, 'level2', 3)
addLink('level2', 4, 'level1', 2)
addLink('level3', 3, 'level4', 1)


export function getDestination(level, door) {
	return DOORS[level][door]
}
