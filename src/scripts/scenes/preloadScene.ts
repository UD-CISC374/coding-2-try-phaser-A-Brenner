export default class PreloadScene extends Phaser.Scene {
  

  
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load_images();
    this.load_spritesheets();
  }

  create() {
    this.add.text(20,20, "Loading Game...");
    /*
    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("explosion-og"),
      frameRate: 20,
      repeat: 0
    });
    */
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
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
      key: "explode", // creating animation called ship1_anim
      frames: this.anims.generateFrameNumbers("explosion"), // use spritesheet explosion
      frameRate: 20, // 20 frames per second
      repeat: 0,
      hideOnComplete: true
    });
    this.anims.create({
      key: "thrust", // creating animation called ship1_anim
      frames: this.anims.generateFrameNumbers("ship"), // use spritesheet ship
      frameRate: 20, // 20 frames per second
      repeat: -1, // infinite loop
    });

    this.scene.start('MainScene');
  }
  

  load_images(){
    //this.load.image("background", "assets/images/background.png");
    this.load.image("space_background", "assets/images/space_background.png");
    this.load.image("laser-beam1", "assets/images/laser-beam1.png")

    // loading ship images as spritesheets now
    //this.load.image("ship", "assets/images/ship.png");
    //this.load.image("ship2", "assets/images/ship2.png");
    //this.load.image("ship3", "assets/images/ship3.png");
  }

  load_spritesheets(){
    this.load.spritesheet("ship", "assets/spritesheets/ship.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });
    
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    /*
    this.load.spritesheet("explosion-trans", "assets/spritesheets/explosion-og.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    */
  }

}

