import Phaser from 'phaser';

// Scenes

import GameScene from './scenes/game';
import DeathScene from './scenes/death';

const config = {
  type: Phaser.AUTO,
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
    GameScene, 
    DeathScene
  ],
};

const game = new Phaser.Game(config);
