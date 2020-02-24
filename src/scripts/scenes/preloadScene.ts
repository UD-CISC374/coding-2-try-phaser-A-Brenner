export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/background.png");

  }

  create() {
    this.add.text(20,20, "Loading Game...");

    this.scene.start('MainScene');
  }
}
