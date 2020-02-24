import ExampleObject from '../objects/exampleObject';
import { timingSafeEqual } from 'crypto';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;


  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //this.exampleObject = new ExampleObject(this, 0, 0);

    //this.background = this.add.image(0,0, "background");
    this.background = this.add.tileSprite(0,0, this.scale.width, this.scale.height, "background");
    this.background.setOrigin(0,0);

    this.make_ships();
    /*
    this.add.text(20,20,"Hellooooo world (^ ^)b", {
      font: "20px Arial", 
      fill: "blue"
    });
    */


  }

  make_ships(){
    this.ship1 = this.add.sprite(this.scale.width/2 - 50, this.scale.height/2, "ship");
    this.ship2 = this.add.sprite(this.scale.width/2, this.scale.height/2, "ship2");
    this.ship3 = this.add.sprite(this.scale.width/2 + 50, this.scale.height/2, "ship3");

    this.anims.create({
      key: "ship1_anim", // creating animation called ship1_anim
      frames: this.anims.generateFrameNumbers("ship"), // use spritesheet ship
      frameRate: 20, // 20 frames per second
      repeat: -1 // infinite loop
    });
    this.anims.create({
      key: "ship2_anim", // creating animation called ship1_anim
      frames: this.anims.generateFrameNumbers("ship2"), // use spritesheet ship
      frameRate: 20, // 20 frames per second
      repeat: -1 // infinite loop
    });
    this.anims.create({
      key: "ship3_anim", // creating animation called ship1_anim
      frames: this.anims.generateFrameNumbers("ship3"), // use spritesheet ship
      frameRate: 20, // 20 frames per second
      repeat: -1 // infinite loop
    });
    this.anims.create({
      key: "explosion_anim", // creating animation called ship1_anim
      frames: this.anims.generateFrameNumbers("explosion"), // use spritesheet ship
      frameRate: 20, // 20 frames per second
      repeat: 0, // infinite loop
      hideOnComplete: true
    });

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");



    //this.ship2.flipY = true;
    //this.ship1.setScale(2);
    //this.ship3.setScale(2);
  }

  move_ship(ship, speed){
    ship.y -= 3;
  }

  resetShipPos(ship){
    ship.y = this.scale.height;
    ship.x = Phaser.Math.Between(0, this.scale.width);

  }

  update() {

    //this.ship1.angle += 3;
    //this.ship3.angle -= 3;
/*
    if(this.ship2.y >= 0){
      this.move_ship(this.ship2, 3);
    } else {
      this.resetShipPos(this.ship2)
    }
  */

    this.background.tilePositionY -= 0.5;

  }

}
