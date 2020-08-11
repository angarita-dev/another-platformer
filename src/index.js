import Phaser from 'phaser';

// Plugins
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin';

// Sass loading
import './style/main.scss';

// Scenes

import SelectionScene from './scenes/characterSelection';
import BackgroundScene from './scenes/background';
import GameScene from './scenes/game';
import DeathScene from './scenes/death';
import TitleScene from './scenes/title';
import CreditsScene from './scenes/credits';
import ScoreboardScene from './scenes/scoreboard';

const config = {
  type: Phaser.CANVAS,
  antialias: false,
  scale: {
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 450 },
    },
  },
  scene: [
    BackgroundScene,
    TitleScene,
    SelectionScene,
    GameScene,
    DeathScene,
    ScoreboardScene,
    CreditsScene,
  ],
  parent: 'divId',
  dom: {
    createContainer: true,
  },
  plugins: {
    global: [{
      key: 'rexInputTextPlugin',
      plugin: InputTextPlugin,
      start: true,
    },
    ],
  },
};

const game = new Phaser.Game(config);
