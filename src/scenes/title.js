import Phaser from 'phaser';

// Importing Assets
import titleAsset from '../assets/general/Title.png';

export default class Title extends Phaser.Scene {
  init(data) {
    this.backgroundScene = data.backgroundScene;
  }
  constructor() {
    super('titleScene');
  }

  preload() {
    this.load.spritesheet('title', titleAsset,
      { frameWidth: 128, frameHeight: 128 } );
  }

  addTitle() {
    this.title = this.add.sprite(400, 200, 'title').setScale(4.5);
    this.fade(this.title, 0, 1);

    // Title animation
    this.anims.create({
      key: 'still',
      frames: [{ key: 'title', frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'shine',
      frames: this.anims.generateFrameNumbers('title', { start: 1, end: 60 }),
      frameRate: 60
    });

    this.tweens.addCounter({ from: 0, to: 1, duration: 3000,
      loop: -1,
      loopDelay: 4000,
      onLoop: () => {
        this.title.anims.play('shine', true);
        this.title.anims.nextAnim = 'still';
      }
    });
  }

  addPlayTitle() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#333',
    };

    const click = () => {
      this.scene.launch('game');
      this.scene.remove(this);
    }

    const enterHover = () => {
      this.playTitle.setStyle({ color: '#000' });
    }

    const exitHover = () => {
      this.playTitle.setStyle({ color: '#333' });
    }

    this.playTitle = this.add.text(370, 400, `Play`, stylingOptions);
    this.fade(this.playTitle, 0, 1);

    this.playTitle.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { click() })
      .on('pointerover', () => { enterHover() })
      .on('pointerout', () => { exitHover() });
  }

  addCreditsTitle() {
    const stylingOptions = { 
      fontFamily: 'Alagard',
      fontSize: '22px',
      color: '#333',
    };

    const enterHover = () => {
      this.playCredits.setStyle({ color: '#000' });
    }

    const exitHover = () => {
      this.playCredits.setStyle({ color: '#333' });
    }

    this.playCredits = this.add.text(365, 432, `Credits`, stylingOptions);
    this.fade(this.playCredits, 0, 1);

    this.playCredits.setInteractive({ cursor: 'pointer' })
      .on('pointerover', () => { enterHover() })
      .on('pointerout', () => { exitHover() });
  }

  fade(element, from, to, onEnd = () => {}) {
    element.alpha = from,
     this.tweens.add({
      targets: element,
      alpha: to,
      duration: 1500,
      onComplete: () => { onEnd() }
    });
  }

  fadeIn(element) {
    element.alpha = 0;
  }

  create() {
    this.addTitle();
    this.addPlayTitle();
    this.addCreditsTitle();
  }
}
