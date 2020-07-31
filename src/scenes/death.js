import Phaser from 'phaser';

export default class DeathScene extends Phaser.Scene {
  init(data) {
    this.endingX = data.endingX;
    this.score = data.score;
  }

  constructor() {
    super('death');
  }

  preload() {
  }

  addMessage() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#fff',
    };

    this.add.text(20, 20, `You died with ${this.score} items`, stylingOptions);
    this.add.text(20, 60, "I'm ... dissapointed", stylingOptions);
  }

  addReplay() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '32px',
      color: '#fff',
    };


    this.replayText = this.add.text(0, 300, 'Replay', stylingOptions);
    this.centerTextHorizontally(this.replayText);
  }

  centerTextHorizontally(text) {
    text.x = (this.game.config.width / 2) - (text.width / 2);
  }


  create() {
    this.addMessage();
    this.addReplay();
    this.scene.get('background').handleDeath();
  }

  update() {
  }
}
