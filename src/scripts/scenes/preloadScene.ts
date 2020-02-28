export default class PreloadScene extends Phaser.Scene {
  instructionLabel: Phaser.GameObjects.Text;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  instructions: string = "Use the arrow keys to move your spaceship,\nPress the spacebar to fire,\nAvoid the bombs,\n& SAVE THE GALAXY!";

  
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load_images();
    this.load_spritesheets();
  }

  create() {
    this.add.text(0,0, "Loading Game...", {font: "25px Arial", fill: "black"});
    this.add.text(10, this.scale.height / 2, this.instructions, {font: "12px Arial", fill: "black", align: "center"});
    this.add.text(60, (this.scale.height / 2) + 100, "Press Spacebar to Begin!", {font: "12px Arial", fill: "black", align: "center"});
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.create_spritesheets();
    
    

  }

  update(){
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.scene.start('MainScene');
    }
  }

  create_spritesheets(){
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
      key: "explode", // creating animation called explode
      frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 4}), // use spritesheet explosion
      frameRate: 20, // 20 frames per second
      repeat: 0, // play once and then stop
      hideOnComplete: true // hide final from of animation once completed
    });
    this.anims.create({
      key: "thrust", // creating animation called thrust
      frames: this.anims.generateFrameNumbers("ship3", {start: 0, end: 1}), // use spritesheet ship
      frameRate: 20, // 20 frames per second
      repeat: -1, // infinite loop
    });
  }
  

  load_images(){
    this.load.image("background", "assets/images/background.png");
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

