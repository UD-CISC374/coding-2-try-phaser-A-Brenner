import ExampleObject from '../objects/exampleObject';
import { timingSafeEqual } from 'crypto';
import PreloadScene from './preloadScene';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  powerUps: Phaser.Physics.Arcade.Group;
  player: Phaser.Physics.Arcade.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  playerSpeed: 200;
  spacebar: Phaser.Input.Keyboard.Key;
  projectiles: Phaser.GameObjects.Group;
  beam: Phaser.GameObjects.Image;


  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //this.exampleObject = new ExampleObject(this, 0, 0);

    //this.background = this.add.image(0,0, "background");
    this.background = this.add.tileSprite(0,0, this.scale.width, this.scale.height, "space_background");
    this.background.setOrigin(0,0);

    //this.make_ships();
    this.createPowerUpAnims()

    this.player = this.physics.add.sprite(this.scale.width / 2 - 8, this.scale.height - 64, "player");
    this.player.flipY = true;
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);


    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group();

    // adding collisions
    this.physics.add.collider(this.powerUps, this.powerUps);
    this.physics.add.overlap(this.player, this.powerUps);


  }

  check_collisions(projectiles, powerUps){
    for(let i = 0; i < projectiles.getChildren().length; i++){
      for(let j = 0; j < powerUps.getChildren().length; j++){
        
        //if(projectiles.getChildren()[i].y >= )
      }
    }
  }

  /*
  make_ships(){
    this.ship1 = this.add.sprite(this.scale.width/2 - 50, this.scale.height/2, "ship");
    this.ship2 = this.add.sprite(this.scale.width/2, this.scale.height/2, "ship2");
    this.ship3 = this.add.sprite(this.scale.width/2 + 50, this.scale.height/2, "ship3");
    

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);
  }
  */

  
  createPowerUpAnims(){
    // put each powerup in a group
    this.powerUps = this.physics.add.group();

    let maxObjects: number = 4;
    for(let i = 0; i<= maxObjects; i++){
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

  destroyShip(pointer, gameObject){
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  explode(gameObject){
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  
 
  /*
  resetShipPos(ship){
    ship.y = this.scale.height;
    ship.x = Phaser.Math.Between(0, this.scale.width);
  }
  */

  

  update() {
    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
    }
    
    for(let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      this.moveBeam(beam);
    }

  }

  // keyboard logic to move player
  movePlayerManager(){
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-200);
      this.player.setVelocityY(0);
    } else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(200);
      this.player.setVelocityY(0);
    }else if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-200);
      this.player.setVelocityX(0);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(200);
      this.player.setVelocityX(0);
    }
  } 


  shootBeam(){
    this.beam = this.add.image(this.player.x, this.player.y, "laser-beam1");
    this.beam.setScale(0.05);
    this.projectiles.add(this.beam);
    this.moveBeam(this.beam)

    /*
    this.beam = this.physics.add.sprite(this.player.x, this.player.y, "explosion-og");
    this.beam.play("beam-anim");
    this.beam.setVelocityY(-100);
    this.projectiles.add(this.beam);
    */
    //let beam = new Beam(this);
  }

  // update posn of beam once it has been fired
  moveBeam(beam){
    beam.y -= 10;
  }

}
