import Phaser from 'phaser';

// Importing assets
import skyAsset from '../assets/Background/Sky/sky.jpeg';

export default class Background extends Phaser.Scene {
  constructor() {
    super('background');
  }

  preload() {
    this.load.image('sky', skyAsset);  

  }

  scrollTo(targetPosition, onEnd = () => {}) {
    const currentCameraPosition = this.cameras.main.scrollY;
    this.tweens.addCounter({
      from: currentCameraPosition,
      to: targetPosition,
      duration: 2000,
      ease: 'Power1',
      onUpdate: (tween, target) => {
        this.cameras.main.scrollY = target.value;
      },
      onComplete: () => { onEnd() }
    });
  }

  snapTo(targetPosition) {
    this.cameras.main.scrollY = targetPosition;
  }

  create() {
    this.add.image(0, -2700, 'sky')
      .setScale(1.5)
      .setOrigin(0);
    
    this.snapTo(-2700);
    const launchScene = () => { this.scene.launch('titleScene') };
    this.scrollTo(0, launchScene);
  }
}
