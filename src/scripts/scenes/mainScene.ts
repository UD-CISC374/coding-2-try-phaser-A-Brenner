import ExampleObject from '../objects/exampleObject';
import { timingSafeEqual } from 'crypto';
import PreloadScene from './preloadScene';

/**
 * MainScene
 * 
 */
export default class mainScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  powerUps: Phaser.Physics.Arcade.Group;
  player: Phaser.Physics.Arcade.Sprite;
  explosion: Phaser.Physics.Arcade.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  playerSpeed: number = 200;
  spacebar: Phaser.Input.Keyboard.Key;
  projectiles: Phaser.GameObjects.Group;
  beam: Phaser.GameObjects.Image;
  enter: Phaser.Input.Keyboard.Key;
  scoreLabel: Phaser.GameObjects.Text;
  scoreCount: number = 0;
  scoreCountLabel: Phaser.GameObjects.Text;
  roundLabel: Phaser.GameObjects.Text;
  roundCountLabel: Phaser.GameObjects.Text;
  round: number = 1;


  constructor() {
    super({ key: 'mainScene' });
  }

  create() {
    // set up background and labels
    this.background = this.add.tileSprite(0,0, this.scale.width, this.scale.height, "space_background");
    this.background.setOrigin(0,0);
    this.scoreLabel = this.add.text(0,0, "Score: ");
    this.scoreCount = 0;
    this.scoreCountLabel = this.add.text(60, 0, this.scoreCount.toString());
    this.roundLabel = this.add.text(this.scale.width - 100, 0, "Round: ");
    this.roundCountLabel = this.add.text(this.scale.width - 40, 0, this.round.toString());


    // create groups for powerUps(bombs) and projectiles. Then create actual powerUps
    this.powerUps = this.physics.add.group();
    this.createPowerUpAnims(this.round);
    this.projectiles = this.add.group(); // creates a group for projectiles


    // create player
    this.player = this.physics.add.sprite(this.scale.width / 2 - 8, this.scale.height - 64, "thrust");
    this.player.flipY = true;
    this.player.play("thrust");
    this.player.setCollideWorldBounds(true);

    // keyboard input
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    // adding collisions
    this.physics.add.collider(this.powerUps, this.powerUps);
    this.physics.add.overlap(this.player, this.powerUps, this.hurtPlayer, function(){}, this);
    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerup){
      projectile.destroy();
      powerup.destroy();
    }, function(){}, this);
  }

  // creates and spawns powerUps (bombs)
  createPowerUpAnims(numObjects){
    // put each powerup in a group
    let maxObjects: number = numObjects;
    for(let i = 0; i < maxObjects; i++){
      let powerUp = this.physics.add.sprite(16,16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0,0, this.scale.width, this.scale.height);
    
      // 50-50 chance to spawn a red or gray power up animation
      if(Math.random() > 0.5) {
        powerUp.play("red");
      } else{
        powerUp.play("gray");
      }

      powerUp.setVelocity(100,100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }
  }

  // player has destroyed all enemies
  // spawn new enemies, reward player, and up the round
  nextRound(){
    //this.add.text(this.scale.width - 200, this.scale.height - 100, "");
    this.scoreCount += 100 * this.round;
    this.round += 1;
    this.roundCountLabel.setText(this.round.toString());
    this.createPowerUpAnims(this.round * 2);
  }

  hurtPlayer(){
    this.scoreCount -= 10;
    let explosionX = this.player.x;
    let explosionY = this.player.y;
    this.explosion = this.physics.add.sprite(explosionX, explosionY, "explode");
    this.explosion.x = explosionX;
    this.explosion.y = explosionY;
    this.explosion.play("explode");
    this.respawnPlayer();
  }

  respawnPlayer(){
    this.player.x = this.scale.width/2 - 8;
    this.player.y = this.scale.height/2 - 8;
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
  }

  powerUpShot(){
    this.scoreCount+= 10;
  }

  update() {
    this.background.tilePositionY -= 0.5;
    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
    }
    if (Phaser.Input.Keyboard.JustDown(this.enter)){
      this.respawnPlayer();
    }
    
    for(let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      this.moveBeam(beam);
    }
    this.scoreCount += 1;
    this.scoreCountLabel.setText(this.scoreCount.toString());

    if(this.powerUps.getChildren().length <= 0){
      this.nextRound();
    }
  }

  // keyboard logic to move player
  movePlayerManager(){
    if(this.cursorKeys.left !== undefined &&
      this.cursorKeys.right !== undefined &&
      this.cursorKeys.up !== undefined &&
      this.cursorKeys.down !== undefined){
      
      if (this.cursorKeys.left.isDown){
        this.player.setVelocityX(-200);
        this.player.setVelocityY(0);
      } else if(this.cursorKeys.right.isDown){
        this.player.setVelocityX(200);
        this.player.setVelocityY(0);
      } else if(this.cursorKeys.up.isDown){
        this.player.setVelocityY(-200);
        this.player.setVelocityX(0);
      } else if(this.cursorKeys.down.isDown){
        this.player.setVelocityY(200);
        this.player.setVelocityX(0);
      }
    }
  } 


  shootBeam(){
    this.beam = this.add.image(this.player.x, this.player.y, "laser-beam1");
    this.beam.setSize(15,30);
    this.beam.setDisplaySize(15,30);
    //this.beam.setScale(0.05);
    this.physics.add.existing(this.beam);
    this.projectiles.add(this.beam);
  }

  // update posn of beam once it has been fired
  moveBeam(beam){
    beam.y -= 10;
    if(beam.y <= 0){
      beam.destroy();
    }
  }

}
