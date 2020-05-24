# Platformer tutorial in Pixelbox

<img width="624" alt="Screen Shot 2020-05-25 at 0 40 59" src="https://user-images.githubusercontent.com/2462139/82758299-aace2480-9e20-11ea-8400-22a562412b9e.png">

This tutorial is separated into 7 parts:
- Physic and character movements
- Project structure and debug panel
- Level collision
- Animations and polish
- Separate game into scenes
- Entity manager: adding items and ennemies
- Level building and persistency

## Installation
You need [Pixelbox editor](https://cstoquer.itch.io/pixelbox) to build and run this game.

## Test
Each parts is implemented in a separate folder. To test a particular part, modify the `src/main.js` file by removing the comment before the specific part you want to test:

```js
// module.exports = require('./part1_physic/main')
// module.exports = require('./part2_debug/main')
// module.exports = require('./part3_level/main')
// module.exports = require('./part4_animations/main')
// module.exports = require('./part5_scenes/main')
// module.exports = require('./part6_entities/main')
module.exports = require('./part7_persistency/main')
```
