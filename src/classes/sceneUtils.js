import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
  constructor(sceneKey) {
    super(sceneKey);
  }

  centerTextHorizontally(textElement) {
    textElement.x = (this.game.config.width / 2) - (textElement.width / 2);
  }

  centerImageHorizontally(image) {
    image.x = this.game.config.width / 2;
  }

  centerImageVertically(image) {
    image.y = this.game.config.height / 2;
  }

  fade(element, from, to, duration = 1500, onEnd = () => {}) {
    element.alpha = from,
     this.tweens.add({
      targets: element,
      alpha: to,
      duration: 1500,
      onComplete: () => { onEnd() }
    });
  }
}
