import Phaser from 'phaser';
import Scene from '../classes/sceneUtils';

export default class Scoreboard extends Scene {
  constructor() {
    super('scoreboard');
  }

  addLabel() {
    const stylingConfig = { 
      fontFamily: 'Alagard',
      fontSize: '32px',
      color: '#fff'
    };

    this.label = this.add.text(0, 300, 'Tell me your name: ', stylingConfig).setOrigin(0);
  }

  submitInfo() {
    this.submitText.destroy();
    console.log(process.env);
  }

  addSubmitText() {
    const stylingConfig = { 
      fontFamily: 'Alagard',
      fontSize: '32px',
      color: '#fff'
    };

    this.submitText = this.add.text(0, 300, 'Submit', stylingConfig).setOrigin(0);

    const calcX = this.textInput.x + this.textInput.width + this.submitText.width;
    this.submitText.x = calcX

    this.submitText.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { this.submitInfo() });

    this.submitText.disableInteractive();
  }

  addNameInput() {
    const stylingConfig = { 
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#fff',
    };

    const calcX = this.label.x + this.label.width;
    this.textInput = this.add.rexInputText(calcX, 300, 250, 30, stylingConfig).setOrigin(0);
    this.textInput.on('textchange', (inputText, e) => { 
      if(inputText.text.length === 0 || !inputText.text.trim()) {
        this.submitText.disableInteractive();
      } else {
        this.submitText.setInteractive();
      }
    });
  }

  create() {
    this.addLabel();
    this.addNameInput();
    this.addSubmitText();
  }
}
