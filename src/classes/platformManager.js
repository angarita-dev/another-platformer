import Phaser from 'phaser';
import MovingPlatform from './movingPlatform';

export default class platformManager extends Phaser.Physics.Arcade.Group {
  constructor(world, scene) {
    super(world, scene);
    return this;
  }

  newPlatform(scene, centerPlatform, y, addItem, texture, options) {
    const movingPlatform = new MovingPlatform(scene, centerPlatform, y, addItem, texture, options);

    this.add(movingPlatform);
    return movingPlatform;
  }

  moveVertically() {
    this.children.entries.forEach(platform => platform.moveVertically());
  }

  increaseDifficulty(step) {
    this.children.entries.forEach(platform => platform.increaseDifficulty(step));
  }
}
