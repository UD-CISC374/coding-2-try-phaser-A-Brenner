import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //this.exampleObject = new ExampleObject(this, 0, 0);

    this.background = this.add.image(0,0, "background");
    this.background.setOrigin(0,0);

    this.add.text(20,20,"Hellooooo world (^ ^)b", {
      font: "20px Arial", 
      fill: "blue"
    });


  }

  update() {
  }

}
