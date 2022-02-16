import Phaser from "phaser"

export default class Game extends Phaser.Scene {
  preload() {

  }

  create() {
    /*
      Ball Game Object 
    */
    const ball = this.add.circle(400, 300, 10, 0xffffff, 1)
    // attach physics component to the passed in game object
    this.physics.add.existing(ball)
    // body accesses the physics component on the game object
    ball.body.setCollideWorldBounds(true, 1, 1)  // tells phaser that the object can collide with the screen edge. the x and y are the velocity? of the bounce
    ball.body.setVelocity(-200, 0)

    /*
      Paddle Game Objects
    */
    this.paddleLeft = this.add.rectangle(30, 300, 15, 100, 0xffffff, 1)
    this.paddleRight = this.add.rectangle(770, 300, 15, 100, 0xffffff, 1)
    // the true flag creates static bodies that cannot be moved by the physics
    this.physics.add.existing(this.paddleLeft, true)
    this.physics.add.existing(this.paddleRight, true)

    /*
      Physics Interactions
    */
    ball.body.setBounce(1,1)
    this.physics.add.collider(this.paddleLeft, ball)
    this.physics.add.collider(this.paddleRight, ball)

    /*
      Player Input
    */
    this.playerInput = this.input.keyboard.createCursorKeys()
    
  }

  update() {
    if(this.playerInput.up.isDown) {
      this.paddleLeft.y -= 10
      this.paddleLeft.body.updateFromGameObject()

    } else if(this.playerInput.down.isDown) {
      this.paddleLeft.y += 10
      this.paddleLeft.body.updateFromGameObject()

    } 
  }
}