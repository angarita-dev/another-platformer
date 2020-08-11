import Phaser from 'phaser';
import Scene from '../classes/sceneUtils';

// Importing Assets
import fallingAsset from '../assets/Characters/Cowboy/falling.png';

export default class DeathScene extends Scene {
  init(data) {
    this.endingX = data.endingX;
    this.score = data.score;
  }

  constructor() {
    super('death');
  }

  preload() {
    this.load.spritesheet('falling', fallingAsset,
      { frameWidth: 32, frameHeight: 32 });
  }

  addFallingCharacter() {
    this.falling = this.add.sprite(this.endingX, 560, 'falling').setScale(2);

    // Animation
    this.anims.create({
      key: 'drop',
      frames: this.anims.generateFrameNumbers('falling', { start: 0, end: 7 }),
      frameRate: 10,
    });

    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('falling', { start: 8, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });

    this.falling.anims.play('drop', true);
    this.falling.anims.nextAnim = 'fall';

    this.moveFallingCharacter();
    this.fadeFallingCharacter();
  }

  moveFallingCharacter() {
    this.tweens.addCounter({
      from: this.falling.y,
      to: 0,
      duration: 2500,
      onUpdate: (tween, target) => { this.falling.y = target.value; },
    });
  }

  fadeFallingCharacter() {
    const removeCharacter = () => { this.falling.destroy(); };
    this.fade(this.falling, 1, 0, 2000, removeCharacter);
  }

  addMessage() {
    const stylingOptions = {
      fontFamily: 'Alagard',
      fontSize: '29px',
      color: '#fff',
    };

    this.add.text(20, 20, `You died with ${this.score} items ... I'm dissapointed`, stylingOptions);
  }

  replay() {
    const backgroundCamera = this.backgroundScene.cameras.main;

    const onFadeInBackgroundEnd = () => {
      this.scene.start('characterSelection');
    };

    const fadeInBackground = () => {
      this.backgroundScene.titleScreenPosition();

      this.scene.stop();
      this.scoreboardScene.scene.stop();

      backgroundCamera.fadeIn(2000);
      backgroundCamera.on('camerafadeincomplete', () => { onFadeInBackgroundEnd(); });
    };

    this.fadeOutElements(1500, () => { fadeInBackground(); });
    this.scoreboardScene.fadeOutElements(1500);
  }

  addReplay() {
    const stylingOptions = {
      fontFamily: 'Alagard',
      fontSize: '32px',
      color: '#fff',
    };

    this.replayText = this.add.text(0, 550, 'Replay', stylingOptions);
    this.replayText.setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => { this.replay(); });
    this.centerTextHorizontally(this.replayText);
  }

  handleDeath() {
    this.backgroundScene.handleDeath();

    this.addReplay();
  }

  addScores() {
    this.scene.launch('scoreboard', { currentScore: this.score });
  }

  create() {
    this.backgroundScene = this.scene.get('background');

    this.addFallingCharacter();
    this.addMessage();
    this.addScores();
    this.handleDeath();

    this.scoreboardScene = this.scene.get('scoreboard');
  }
}
