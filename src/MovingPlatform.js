import Phaser from 'phaser';

class MovingPlatform extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, texture, smallestX, biggestX, options) {
    super(scene, x, y, texture, 0, options);

    scene.add.existing(this);

    this.startY = y;
    this.smallestX = smallestX;
    this.biggestX = biggestX;
    this.isMovingVertically = false;
  }

  setupFriction() {
    this.body.immovable = true;
    this.body.allowGravity = false;
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
        const scrollY = this.scene.cameras.main.scrollY;
        const y = this.startY + target.value + scrollY;
        const dy = y - this.y;
        this.body.velocity.y = dy;
        this.refreshBody();

        if (this.y >= 650) this.respawnPlatform();
      }
    });
  }

  respawnPlatform() {
    this.startY = -125;
    this.y = -125;
    this.x = Phaser.Math.Between(this.smallestX, this.biggestX);
    this.runningTween.restart();
  }

  respawn(x, y) {
    this.startY = y;
    this.y = y;
    this.x = x;
    this.refreshBody();
    if (this.isMovingVertically) this.runningTween.restart();
  }
}

export default MovingPlatform;
