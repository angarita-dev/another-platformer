import Phaser from 'phaser';
import MovingPlatform from './MovingPlatform';

function preload() {
  this.load.baseURL = './src/assets/';
  this.load.image('logo', 'logo.png');
  this.load.image('sky', 'sky.png');
  this.load.image('platform', 'platform.png');
  this.load.image('star', 'star.png');
  this.load.image('bomb', 'bomb.png');
  this.load.spritesheet('dude',
    'dude.png',
    { frameWidth: 32, frameHeight: 48 });
}

let platforms;
let player;
let camera;

function create() {
  // Adding Background
  this.add.image(400, 300, 'sky')
    .setScrollFactor(1, 0);

  // Adding Platforms

  platforms = this.physics.add.group();

  let floorX;
  for (let i = 0; i < 6; i += 1) {
    const y = 600 - (146 * i); // Start generating platforms at bottom
    const centerPlatform = i % 2 === 0;

    const platform = new MovingPlatform(this, centerPlatform, y, 'platform', {
      isStatic: true,
    });

    platforms.add(platform);
    platform.scaleX = 0.5;
    platform.setupFriction();
    platform.refreshBody();

    if (i === 0) floorX = platform.x; // Starting platform x
  }

  // Adding Player
  player = this.physics.add.sprite(floorX, 500, 'dude');
  player.setBounce(0.06);
  player.setCollideWorldBounds(true);
  player.setFrictionX(0);
  this.physics.world.checkCollision.up = false;

  // Player animation
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  // Adding Interaction between platforms & player
  this.physics.add.collider(player, platforms);

  // Setting up Camera
  camera = this.cameras.main;
}

function update() {
  // Control keys
  const cursors = this.input.keyboard.createCursorKeys();
  const touchingDown = player.body.touching.down;
  const playerXVelocity = player.body.velocity.x;
  const movingRight = cursors.right.isDown;
  const movingLeft = cursors.left.isDown;
  const movingUp = cursors.up.isDown;
  const movingDown = cursors.down.isDown;


  if (movingRight) {
    player.anims.play('right', true);
    if (touchingDown) {
      player.setVelocityX(160);
    } else if (playerXVelocity <= 0) {
      player.setVelocityX(85);
    }
  } else if (movingLeft) {
    player.anims.play('left', true);
    if (touchingDown) {
      player.setVelocityX(-160);
    } else if (playerXVelocity >= 0) {
      player.setVelocityX(-85);
    }
  } else {
    player.anims.play('turn', true);
    player.setVelocityX(0);
  }
  if (movingUp && touchingDown) {
    player.body.velocity.y -= 400;
  }
  if (movingDown) {
    player.body.velocity.y += 20;
  }

  if (player.y <= 300 && touchingDown) {
    platforms.children.entries.forEach(platform => {
      platform.moveVertically();
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 450 },
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
