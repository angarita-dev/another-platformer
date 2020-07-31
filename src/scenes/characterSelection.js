import Phaser from 'phaser';

// Importing Assets
import cowboySelection from '../assets/Characters/Cowboy/selection.png';

export default class CharacterSelection extends Phaser.Scene {
  constructor() {
    super('characterSelection');
  }

  preload () {
    this.load.image('selection', cowboySelection);
  }

  centerAroundHorizontally(element, divider = 2) {
    element.x = this.game.config.width / divider;
  }

  centerAroundVertically(element, divider = 2) {
    element.y = this.game.config.height / divider;
  }

  addText() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#000',
    };
    this.selectText = this.add.text(200, 80, 'Select your character', stylingOptions);
    this.selectText.x = (this.game.config.width / 2) - (this.selectText.width / 2);
  }

  fade(element, from, to, onEnd = () => {}) {
    element.alpha = from,
     this.tweens.add({
      targets: element,
      alpha: to,
      duration: 1000,
      onComplete: () => { onEnd() }
    });
  }

  fadeOutElements(onEnd = () => {}) {
    this.fade(this.cowboyImage, 1, 0, onEnd);
    this.fade(this.selectText, 1, 0);
  }

  startGame() {
    this.fadeOutElements(() => {
      this.backgroundScene.scrollTo(0, 2000, () => {
        this.scene.launch('game');
        this.scene.stop();
      });
    });
  }

  addCowboySelection() {
    this.cowboyImage = this.add.image(0, 0, 'selection')
      .setScale(2);
    this.centerAroundVertically(this.cowboyImage);
    this.centerAroundHorizontally(this.cowboyImage, 2);

    this.cowboyImage.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { this.startGame() });
  }

  create() {
    this.backgroundScene = this.scene.get('background');

    this.addText();
    this.addCowboySelection();
  }
}
