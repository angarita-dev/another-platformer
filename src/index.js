import Phaser from 'phaser';

// Sass loading
import './style/main.scss';

// Scenes

import SelectionScene from './scenes/characterSelection';
import BackgroundScene from './scenes/background';
import GameScene from './scenes/game';
import DeathScene from './scenes/death';
import TitleScene from './scenes/title';
import CreditsScene from './scenes/credits';

const config = {
  type: Phaser.CANVAS,
  antialias: false,
  scale: {
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 450 }
    },
  },
  scene: [
    BackgroundScene,
    TitleScene,
    SelectionScene,
    GameScene, 
    DeathScene,
    CreditsScene
  ],
};

const game = new Phaser.Game(config);
