import Phaser from 'phaser';

export default class MovingPlatform extends Phaser.Physics.Arcade.Image {
  static setupX(centerPlatform) {
    let lowerXBound;

    if (centerPlatform) {
      lowerXBound = 350;
    } else {
      const randomBool = Math.random() >= 0.5;

      lowerXBound = randomBool ? 120 : 570;
    }
    const upperXBound = lowerXBound + 100;

    return Phaser.Math.Between(lowerXBound, upperXBound);
  }

  static shouldAddItem(probability) {
    return Math.random() >= 1.0 - probability;
  }

  addItemStartingParameters() {
    return {
      x: this.x + Phaser.Math.Between(-60, 60), 
      y: this.startY - 120,
    }
  }

  handleItemAdd(probability) {
    if (MovingPlatform.shouldAddItem(probability)) {
      const itemInfo = this.addItemStartingParameters();

      this.addItem(itemInfo.x, itemInfo.y);
    }
  }

  constructor(scene, centerPlatform, y, addItem, texture, options) {
    const x = MovingPlatform.setupX(centerPlatform);

    super(scene, x, y, texture, 0, options);

    this.centerPlatform = centerPlatform;
    this.startY = y;
    this.isMovingVertically = false;
    this.addItem = addItem;

    this.START_ITEM_PROBABILIY = 0.3;
    this.RESPAWN_ITEM_PROBABILIY = 0.4;

    this.handleItemAdd(this.START_ITEM_PROBABILIY);
    scene.add.existing(this);
  }

  setupFriction() {
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.body.friction.x = 0;
    this.body.friction.y = 1;
    this.body.bounce.y = 0;
  }

  moveVertically() {
    if (this.isMovingVertically) return;

    this.isMovingVertically = true;
    this.runningTween = this.scene.tweens.addCounter({
      from: 0,
      to: 1000,
      duration: 9000,
      onUpdate: (tween, target) => {
        const { scrollY } = this.scene.cameras.main;
        const y = this.startY + target.value + scrollY;
        const dy = y - this.y;
        this.body.velocity.y = dy;
        this.refreshBody();

        if (this.y >= 650) this.respawnPlatform();
      },
    });
  }

  respawnPlatform() {
    this.startY = -125;
    this.y = -125;
    this.x = MovingPlatform.setupX(this.centerPlatform);
    this.runningTween.restart();

    this.handleItemAdd(this.RESPAWN_ITEM_PROBABILIY);
  }
}
