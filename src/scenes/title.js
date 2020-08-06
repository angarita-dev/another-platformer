import Phaser from 'phaser';
import Scene from '../classes/sceneUtils';

// Importing Assets
import titleAsset from '../assets/general/Title.png';

export default class Title extends Scene {
  constructor() {
    super('titleScene');
  }

  preload() {
    this.load.spritesheet('title', titleAsset,
      { frameWidth: 128, frameHeight: 128 });
  }

  addTitle() {
    this.title = this.add.sprite(400, 200, 'title').setScale(4.5);

    // Title animation
    this.anims.create({
      key: 'still',
      frames: [{ key: 'title', frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'shine',
      frames: this.anims.generateFrameNumbers('title', { start: 1, end: 60 }),
      frameRate: 60,
    });

    this.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 3000,
      loop: -1,
      loopDelay: 4000,
      onLoop: () => {
        this.title.anims.play('shine', true);
        this.title.anims.nextAnim = 'still';
      },
    });
  }

  startGame() {
    this.scene.launch('characterSelection');
    this.scene.stop();
  }

  startCredits() {
    const launchCredits = () => {
      this.scene.launch('credits');
    };

    const stopScenes = () => {
      this.backgroundScene.scene.stop();
      this.scene.stop();
    };

    const closeBackground = () => {
      this.backgroundScene.fadeOutElements(700, stopScenes);
    };

    this.fadeOutElements(700, launchCredits);
    this.backgroundScene.scrollTo(-1800, 3500, closeBackground);
  }

  addPlayTitle() {
    const stylingOptions = {
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#333',
    };

    const click = () => {
      if (this.playTitle.alpha < 0.5) return;

      this.fadeOutElements();
      this.startGame();
    };

    const enterHover = () => {
      this.playTitle.setStyle({ color: '#000' });
    };

    const exitHover = () => {
      this.playTitle.setStyle({ color: '#333' });
    };

    this.playTitle = this.add.text(0, 400, 'Play', stylingOptions);
    this.centerTextHorizontally(this.playTitle);

    this.playTitle.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { click(); })
      .on('pointerover', () => { enterHover(); })
      .on('pointerout', () => { exitHover(); });
  }

  addCreditsTitle() {
    const stylingOptions = {
      fontFamily: 'Alagard',
      fontSize: '22px',
      color: '#333',
    };

    const click = () => {
      if (this.playCredits.alpha < 0.5) return;
      this.startCredits();
    };

    const enterHover = () => {
      this.playCredits.setStyle({ color: '#000' });
    };

    const exitHover = () => {
      this.playCredits.setStyle({ color: '#333' });
    };

    this.playCredits = this.add.text(0, 432, 'Credits', stylingOptions);
    this.centerTextHorizontally(this.playCredits);

    this.playCredits.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { click(); })
      .on('pointerover', () => { enterHover(); })
      .on('pointerout', () => { exitHover(); });
  }

  create() {
    this.backgroundScene = this.scene.get('background');

    this.addTitle();
    this.addPlayTitle();
    this.addCreditsTitle();
    this.fadeInElements();
  }
}
