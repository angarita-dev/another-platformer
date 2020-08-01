import Phaser from 'phaser';
import Scene from '../classes/sceneUtils';

export default class DeathScene extends Scene {
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

  replay() {
    const backgroundCamera = this.backgroundScene.cameras.main;

    const onFadeInBackgroundEnd = () => {
      this.scene.start('characterSelection');
    }

    const fadeInBackground = () => {
      this.backgroundScene.titleScreenPosition();

      this.scene.stop();
      backgroundCamera.fadeIn(2000);
      backgroundCamera.on('camerafadeincomplete', () => { onFadeInBackgroundEnd() });
    }

    const camera = this.cameras.main;

    camera.fadeOut();
    camera.on('camerafadeoutcomplete', () => { fadeInBackground() });
  }

  addReplay() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '32px',
      color: '#fff',
    };

    this.replayText = this.add.text(0, 550, 'Replay', stylingOptions);
    this.replayText.setInteractive({ cursor: 'pointer'})
      .on('pointerdown', () => { this.replay() });
    this.centerTextHorizontally(this.replayText);
  }

  handleDeath() {
    this.backgroundScene.handleDeath();

    this.addReplay();
  }

  create() {
    this.backgroundScene = this.scene.get('background');
    this.addMessage();
    this.handleDeath();
  }

  update() {
  }
}
