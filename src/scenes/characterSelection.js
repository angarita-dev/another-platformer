import Phaser from 'phaser';
import Scene from '../classes/sceneUtils'

// Importing Assets
import cowboySelection from '../assets/Characters/Cowboy/selection.png';

export default class CharacterSelection extends Scene {
  constructor() {
    super('characterSelection');
  }

  preload () {
    this.load.image('selection', cowboySelection);
  }

  addText() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#000',
    };
    this.selectText = this.add.text(200, 80, 'Select your character', stylingOptions);

    this.centerTextHorizontally(this.selectText);
  }

  startGame() {
    this.fadeOutElements(700, () => {
      this.backgroundScene.scrollTo(0, 2000, () => {
        this.scene.launch('game');
        this.scene.stop();
      });
    });
  }

  addCowboySelection() {
    this.cowboyImage = this.add.image(0, 0, 'selection')
      .setScale(2);
    this.centerImageVertically(this.cowboyImage);
    this.centerImageHorizontally(this.cowboyImage);

    this.cowboyImage.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { this.startGame() });
  }

  create() {
    this.backgroundScene = this.scene.get('background');

    this.addText();
    this.addCowboySelection();

    // Adds fade transition
    this.fadeInElements(700);
  }
}
