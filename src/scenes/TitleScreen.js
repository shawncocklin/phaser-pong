import Phaser from "phaser"

export default class TitleScreen extends Phaser.Scene {
  preload() {

  }

  create() {
    const text = this.add.text(400, 300, 'Ponger')
    // this will center text based on the central point of the game object that is created
    // instead of the top-left corner
    text.setOrigin(0.5, 0.5)
  }
}