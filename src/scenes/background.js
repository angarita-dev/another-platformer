import Phaser from 'phaser';

// Importing assets
import skyAsset from '../assets/Background/Sky/sky.jpeg';
import mountainAsset01 from '../assets/Background/Back/front.png';
import mountainAsset02 from '../assets/Background/Back/front02.png';

import cloudAsset01 from '../assets/Background/Clouds/cloud_01.png';
import cloudAsset02 from '../assets/Background/Clouds/cloud_02.png';
import cloudAsset03 from '../assets/Background/Clouds/cloud_03.png';
import cloudAsset04 from '../assets/Background/Clouds/cloud_04.png';
import cloudAsset05 from '../assets/Background/Clouds/cloud_05.png';
import cloudAsset06 from '../assets/Background/Clouds/cloud_06.png';
import cloudAsset07 from '../assets/Background/Clouds/cloud_07.png';

export default class Background extends Phaser.Scene {
  constructor() {
    super('background');

    this.fakeScroll = 0;
  }

  preload() {
    this.load.image('sky', skyAsset);  
    this.load.image('mountain01', mountainAsset01);
    this.load.image('mountain02', mountainAsset02);
    this.load.image('cloud01', cloudAsset01);
    this.load.image('cloud02', cloudAsset02);
    this.load.image('cloud03', cloudAsset03);
    this.load.image('cloud04', cloudAsset04);
    this.load.image('cloud05', cloudAsset05);
    this.load.image('cloud06', cloudAsset06);
    this.load.image('cloud07', cloudAsset07);
  }

  scrollTo(targetPosition, duration, onEnd = () => {}) {
    const currentCameraPosition = this.cameras.main.scrollY;
    this.tweens.addCounter({
      from: currentCameraPosition,
      to: targetPosition,
      duration: duration,
      ease: 'Power1',
      onUpdate: (tween, target) => {
        this.cameras.main.scrollY = target.value;
      },
      onComplete: () => { onEnd() }
    });
  }

  snapTo(targetPosition) {
    this.cameras.main.scrollY = targetPosition;
  }

  spawnClouds() {
    const MIN_X = 0;
    const MAX_X = 1000;
    const MIN_Y = -400;
    const MAX_Y = 250;
    const MIN_SCALE = 1;
    const MAX_SCALE = 3;
    const MIN_DX = 12; 
    const MAX_DX = 20;

    this.frontClouds = this.add.group();
    this.middleClouds = this.add.group();
    this.backClouds = this.add.group();

    const addCloud = (index, x, y, scale, dx) => {
      const cloud = this.add.image(x, y, `cloud0${index}`).
        setScale(scale);
      cloud.moveX = dx;

      if (index < 4) {
        this.frontClouds.add(cloud);
      } else if (index < 6) {
        this.middleClouds.add(cloud);
      } else {
        this.backClouds.add(cloud);
      }
    }

    for (let i = 15; i >= 1; i -= 1) {
      const x = Phaser.Math.Between(MIN_X, MAX_X);
      const y = Phaser.Math.Between(MIN_Y, MAX_Y);
      const scale = Phaser.Math.Between(MIN_SCALE, MAX_SCALE);
      const index = Phaser.Math.Between(1, 7);
      const dx = Phaser.Math.Between(MIN_DX, MAX_DX) / 100;

      addCloud(index, x, y, scale, dx);
    }
  }

  addMountains() {
    this.mountainsBack = this.add.tileSprite(0, 400, 800, 200, 'mountain01')
      .setScale(3, 1)
      .setOrigin(0);

    this.mountainsFront = this.add.tileSprite(0, 500, 800, 100, 'mountain02')
      .setScale(2, 1)
      .setOrigin(0);
  }

  moveMountains() {
    this.mountainsBack.tilePositionX += 0.02;
    this.mountainsFront.tilePositionX += 0.15;
  }

  startBackgroundMove() {
    this.runningTween = this.tweens.addCounter({
      from: 0,
      to: -2700,
      duration: 200000,
      onUpdate: (tween, target) => {
        this.cameras.main.scrollY = target.value;
      }
    });
  }

  handleDeath() {
    if(this.runningTween) {
      this.runningTween.stop();
      this.scrollTo(0, 3000);
    }

    this.cameras.main.fadeOut(3500);
  }

  increaseDifficulty(step) {
    if (!this.runningTween) return

    const newTimeScale = this.runningTween.timeScale + step;
    this.runningTween.setTimeScale(newTimeScale);
  }

  moveClouds() {
    const getChildren = (group) => group.children.entries;

    const moveCloudGroup = (group, move) => {
      getChildren(group).forEach( cloud => { 
        if (cloud.x < -100) cloud.x = 900 // Re-spawns the cloud
        cloud.x -= cloud.moveX
      } );
    }

    moveCloudGroup(this.frontClouds, 0.25);
    moveCloudGroup(this.middleClouds, 0.05);
    moveCloudGroup(this.backClouds, 0.035);
  }

  startGame() {
    this.scrollTo(0, 2000);
  }

  scrollCameraTo(scrollPosition) {
    this.cameras.main.scrollY = scrollPosition;
  }

  create() {
    this.add.image(0, -2700, 'sky')
      .setScale(1.5)
      .setOrigin(0);

    this.addMountains();
    this.spawnClouds();
    
    this.snapTo(-2700);

    const launchTitleScene = () => this.scene.launch('titleScene');

    this.scrollTo(-300, 2000, launchTitleScene);
  }

  update() {
    this.moveClouds();
    this.moveMountains();
  }
}
