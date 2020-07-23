import Phaser from 'phaser';

export default class DeathScene extends Phaser.Scene {
  init(data) {
    this.endingX = data.endingX;
  }

  constructor() {
    super('death');
  }

  preload() {
  }

  create() {
    this.add.text(20, 20, `You died at ${this.endingX}`);
    this.add.text(20, 60, "I'm ... dissapointed");
  }

  update() {
  }
}
