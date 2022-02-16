import Phaser from "phaser"
import TitleScreen from "./scenes/TitleScreen"
import Game from "./scenes/Game"

const config = {
  // dimensions of the render window
  width: 800,
  height: 600,
  // allows Phaser to choose the render type: HTML canvas or WebGL
  type: Phaser.AUTO,
  backgroundColor: 0x333333,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // unknown what unit the number is based on, seems to be a magic number 
      debug: true
    }
  }
}

const game = new Phaser.Game(config)

// add scenes to the game instance. takes a unique key, followed by the imported scene
game.scene.add('title-screen', TitleScreen)
game.scene.add('game', Game)


// starts the scene based on the passed in key
// game.scene.start('title-screen')
game.scene.start('game')


