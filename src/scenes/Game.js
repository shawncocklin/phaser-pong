import Phaser from "phaser"

export default class Game extends Phaser.Scene {

  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)
    this.playerScore = 0
    this.aiScore = 0
    
  }

  preload() {

  }

  create() {

    /*
      World Values 
    */
    const scoreStyle = {fontSize: 42}
    this.playerScoreLabel = this.add.text(350, 50, '0', scoreStyle).setOrigin(0.5, 0.5)
    this.aiScoreLabel = this.add.text(450, 50, '0', scoreStyle).setOrigin(0.5, 0.5)


    // x start value, y start value, total width of boundary, total height of boundary 
    this.physics.world.setBounds(-100, 0, 1000, 600)

    /*
      Ball Game Object 
    */
    this.ball = this.add.circle(400, 300, 10, 0xffffff, 1)
    // attach physics component to the passed in game object
    this.physics.add.existing(this.ball)
    // tells phaser that the object can collide with the screen edge
    this.ball.body.setCollideWorldBounds(true, 1, 1)  
    this.resetBall()

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
    this.ball.body.setBounce(1,1)
    this.physics.add.collider(this.paddleLeft, this.ball)
    this.physics.add.collider(this.paddleRight, this.ball)

    /*
      Player Input
    */
    this.playerInput = this.input.keyboard.createCursorKeys()
    
  }

  update() {
    /** @type {Phaser.Physics.Arcade.StaticBody} */

    // player movement up or down
    if(this.playerInput.up.isDown) {
      if(this.paddleLeft.y <= 60) {
        return
      } 
      this.paddleLeft.y -= 10
      this.paddleLeft.body.updateFromGameObject()

    } else if(this.playerInput.down.isDown) {
      if(this.paddleLeft.y >= 540) {
        return
      }
      this.paddleLeft.y += 10
      this.paddleLeft.body.updateFromGameObject()
    } 

    // ai paddle movement
    const aiSpeed = 3
    const diff = this.ball.y - this.paddleRight.y

    // ball is moving up
    if(diff < 0) {
      // sets the paddle velocity to move up on the screen
      this.paddleRightVelocity.y = -aiSpeed
      if(this.paddleRightVelocity.y < -10) {
        this.paddleRightVelocity.y = -10
      }
    }
    // ball is moving down 
    else if(diff > 0) {
      // sets the paddle velocity to move down on the screen
      this.paddleRightVelocity.y = aiSpeed
      if(this.paddleRightVelocity.y > 10) {
        this.paddleRightVelocity.y = 10
      }
    }
    // adds the vector 2 value to the paddle's y value, allowing it move
    this.paddleRight.y += this.paddleRightVelocity.y
    this.paddleRight.body.updateFromGameObject()

    // score logic
    if(this.ball.x < -30) {
      // ai score
      this.aiScorePoint()
    }
    else if(this.ball.x > 830) {
      // player score
      this.playerScorePoint()
    }
  }

  playerScorePoint() {
    this.playerScore++
    this.playerScoreLabel.text = this.playerScore.toString()
    this.resetBall()
  }

  aiScorePoint() {
    this.aiScore++
    this.aiScoreLabel.text = this.aiScore.toString()
    this.resetBall()
  }

  resetBall() {
    this.ball.setPosition(400, 300)
    const ballSpeed = 200
    const angle = Phaser.Math.Between(0, 360)
    const ballVector = this.physics.velocityFromAngle(angle, ballSpeed)
    this.ball.body.setVelocity(ballVector.x, ballVector.y)
  }
}