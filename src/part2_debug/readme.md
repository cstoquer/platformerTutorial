[< return to main page](https://github.com/cstoquer/platformerTutorial) | [< prev](https://github.com/cstoquer/platformerTutorial/tree/master/src/part1_physic) | [next >](https://github.com/cstoquer/platformerTutorial/tree/master/src/part3_level)
# Part 2: Cleanup and debug panel

In this part we refactored the project structure by separating the code into several modules:
- `constants.js` contains the game's constants for the physic simulation.
- `Player.js` contains all the logic related to the player character.
- `Level.js` contains the logic related to the level rendering. It is currently very simple, but we'll improve on it in the next chapters.
- `game.js` is a module that contain and control all the elements of the game. We designed it as a global module that can be required by the other components (Player and Level). Note how it doesn't initialize the other components directly: these will be injected from the `main.js` file. This way of doing will allow us to avoid circular dependencies.


## Object oriented programming
The code dindn't changed much, we just moved the different variables and functions in their respective files, and made some small modifications to convert this code into proper classes.

If you're new to object oriented programming, here is a small explanation about it.

Notice how the player's variables became attributes of the `Player` class (for instance: `var positionX` became `this.positionX`)


## Debug panel
To demonstrate how it is possible to create debug UI for a game, we will create a debug panel from which we can modify the physic simulation constants. Since we're in an HTML environement, it is really easy to create simple UI using HTML dom elements and CSS. This is implemented in the two files:
- `debug.js`
- `debug.css`

