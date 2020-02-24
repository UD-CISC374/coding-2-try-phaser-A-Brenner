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

    this.scene.start('MainScene');
  }


  load_images(){
    this.load.image("background", "assets/images/background.png");
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
  }
  
}

