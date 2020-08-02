import Phaser from 'phaser';
import Scene from '../classes/sceneUtils';

export default class Credits extends Scene {
  constructor() {
    super('credits');
  }

  addCreditsText() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '29px',
    };

    let startCoord = 400;
    const addText = (text, offAxis = 200, color = '#ddd') => {
      const styling = { ...stylingOptions, color };

      return this.add.text(0, startCoord += offAxis, text, styling);
    }

    const leftColumn = [];
    const rightColumn = [];
    const centerColumn = [];

    // Art & concepts text 
    leftColumn.push(addText('Art & Concepts'));
    rightColumn.push(addText('Jerome of Astora', 0, '#920ec2'));
    rightColumn.push(addText('&', 35));
    rightColumn.push(addText('Juan Manuel', 35, '#cc7d23'));

    // Programming text
    leftColumn.push(addText('Programming'));
    rightColumn.push(addText('Juan Manuel', 0, '#cc7d23'));

    // Special Thanks text
    centerColumn.push(addText('Special thanks to:')); 
    centerColumn.push(addText('Jerome of Astora', 100, '#920ec2')); 
    centerColumn.push(addText('Slowpoke', 55, '#38abd1')); 
    centerColumn.push(addText('&', 55)); 
    centerColumn.push(addText('You for playing <3', 55));

    leftColumn.forEach(text => { this.centerTextHorizontally(text, false, 8) });
    rightColumn.forEach(text => { this.centerTextHorizontally(text, true, 4, 3) });
    centerColumn.forEach(text => { this.centerTextHorizontally(text) });

    const textElements = leftColumn.concat(rightColumn).concat(centerColumn);

    this.creditsText = this.add.group();
    this.creditsText.addMultiple(textElements);
  }

  moveCreditsText() {
    this.tweens.add({
      targets: this.creditsText.getChildren(),
      y: '-= 1400',
      duration: 15000,
      onComplete: () => {
        this.returnToMainMenu();
      }
    });
  }

  returnToMainMenu() {
    const launchTitleScene = () => {
      this.scene.launch('background');
    }

    this.fadeOutElements(700, launchTitleScene);
  }

  addExitIcon() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#fff',
    };

    this.exitIcon = this.add.text(15, 15, 'x', stylingOptions);
    this.exitIcon.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { this.returnToMainMenu() });
  }

  create() {
    this.backgroundScene = this.scene.get('background');

    this.addExitIcon();
    this.addCreditsText();
    this.moveCreditsText();

    this.fadeInElements();
  }

}
