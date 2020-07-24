import Phaser from 'phaser';

export default class DeathScene extends Phaser.Scene {
  init(data) {
    this.endingX = data.endingX;
    this.score = data.score;
  }

  constructor() {
    super('death');
  }

  preload() {
  }

  create() {
    this.add.text(20, 20, `You died with ${this.score} items`);
    this.add.text(20, 60, "I'm ... dissapointed");
  }

  update() {
  }
}
