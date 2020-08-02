import Phaser from 'phaser';

export default class Scene extends Phaser.Scene {
  constructor(sceneKey) {
    super(sceneKey);
  }

  centerTextHorizontally(textElement, centerText = true, divider = 2, multiplier = 1) {
    const textOff = centerText ? textElement.width / 2 : 0;
    textElement.x = (this.game.config.width / divider) * multiplier - textOff; 
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
        duration,
        onComplete: () => { onEnd() }
      });
  }

  fadeInElements(duration = 1500, onEnd = () => {}) {
    this.children.list.forEach( (children, index) => {
      if (index === 0) { // Only add callback to first element
        this.fade(children, 0, 1, duration, onEnd);
      } else {
        this.fade(children, 0, 1, duration);
      }
    });
  }

  fadeOutElements(duration = 1500, onEnd = () => {}) {
    this.children.list.forEach( (children, index) => {
      if (index === 0) { // Only add callback to first element
        this.fade(children, 1, 0, duration, onEnd);
      } else {
        this.fade(children, 1, 0, duration);
      }
    });
  }
}
