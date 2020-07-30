import Phaser from 'phaser';

// Importing Assets
import titleAsset from '../assets/general/Title.png';

export default class Title extends Phaser.Scene {
  constructor() {
    super('titleScene');
  }

  preload() {
    this.load.spritesheet('title', titleAsset,
      { frameWidth: 128, frameHeight: 128 } );
  }

  addTitle() {
    this.title = this.add.sprite(400, 200, 'title').setScale(4.5);
    this.fadeIn(this.title);

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

    const enterHover = () => {
      this.playTitle.setStyle({ color: '#000' });
    }

    const exitHover = () => {
      this.playTitle.setStyle({ color: '#333' });
    }

    this.playTitle = this.add.text(370, 470, `Play`, stylingOptions);
    this.fadeIn(this.playTitle);

    this.playTitle.setInteractive({ cursor: 'pointer' })
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

    this.playCredits = this.add.text(365, 502, `Credits`, stylingOptions);
    this.fadeIn(this.playCredits);

    this.playCredits.setInteractive({ cursor: 'pointer' })
      .on('pointerover', () => { enterHover() })
      .on('pointerout', () => { exitHover() });
  }

  fadeIn(element) {
    element.alpha = 0;
    this.tweens.add({
      targets: element,
      alpha: 1,
      duration: 1500
    });
  }

  create() {
    this.addTitle();
    this.addPlayTitle();
    this.addCreditsTitle();
  }
}
