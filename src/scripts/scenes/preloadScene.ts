/**
 * PreloadScene
 * Sets up the title screen and enables user input in order to start the game 
 * by calling the next scene
 * Also loads and creates all the images and spritesheets used for this application
 * 
 * Credits:
 * Luis Zuno
 * https://www.patreon.com/ansimuz
 * Much of the art and layout for this application was made possible by Luis Zuno
 */
export default class PreloadScene extends Phaser.Scene {
  instructionLabel: Phaser.GameObjects.BitmapText;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  instructions: string = "To fly your spaceship,\nUse the arrow keys,\nPress the spacebar to fire,\nAvoid the bombs,\n& SAVE THE GALAXY!";
  background: Phaser.GameObjects.TileSprite;


  constructor() {
    super({ key: 'PreloadScene' });
  }

  /**
   * Loads a custom font
   * Calls all necessary methods to handle the loading of all images & spritesheets
   */
  preload() {
    this.load_images();
    this.load_spritesheets();
    this.load.bitmapFont("font", "assets/font/font.png", "assets/font/font.fnt");
  }

  /**
  * Loads all necessary images for this application
  */
  load_images(){
    this.load.image("background", "assets/images/background.png");
    this.load.image("space_background", "assets/images/space_background.png");
    this.load.image("laser-beam1", "assets/images/laser-beam1.png")
  }

  /**
   * Loads all necessary spritesheets for this application
   */
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
    this.load.spritesheet("laser-beam1", "assets/images/laser-beam1.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  /**
   * Creates the title screen with a background image and an instruction label
   * Sets up user input for spacebar in order to advance to the next scene and start the game
   * Calls method to create the spritesheets
   */
  create() {
    this.background = this.add.tileSprite(0,0, this.scale.width, this.scale.height, "space_background");
    this.background.setOrigin(0,0);    
    this.instructionLabel = this.add.bitmapText(0, this.scale.height / 4, "font", this.instructions, 50, 1);
    this.add.text(60, (this.scale.height / 2) + 100, "Press Spacebar to Begin!", {font: "12px Arial", fill: "white", align: "center"});
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.create_spritesheets();
  }

  /**
   * Repeatedly called while on this scene
   * Creates a moving background
   * Waits for user to press spacebar key before moving to the next scene
   */
  update(){
    this.background.tilePositionY -= 0.5;
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.background.destroy();
      this.scene.start('mainScene');
    }
  }

  /**
   * Creates all the spritesheets necessary for application
   */
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
      frames: this.anims.generateFrameNumbers("ship2", {start: 0, end: 1}), // use spritesheet ship
      frameRate: 20, // 20 frames per second
      repeat: -1, // infinite loop
    });
    this.anims.create({
      key: "laserSprite", // creating animation called thrust
      frames: this.anims.generateFrameNumbers("laser-beam1", {start: 0, end: 0}), // use spritesheet ship
      frameRate: 20, // 20 frames per second
      repeat: -1, // infinite loop
    });
  }
}

