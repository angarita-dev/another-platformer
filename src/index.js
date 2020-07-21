import Phaser from 'phaser';

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

function create() {
  // Adding Background
  this.add.image(400, 300, 'sky');

  // Adding Platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'platform').setScale(2).refreshBody();
  platforms.create(600, 400, 'platform');

  // Adding Player
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.01);
  player.setCollideWorldBounds(true);

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
}

function update() {
  // Control keys

  const cursors = this.input.keyboard.createCursorKeys();
  const touchingDown = player.body.touching.down;
  const playerXVelocity = player.body.velocity.x;
  const movingRight = cursors.right.isDown;
  const movingLeft = cursors.left.isDown;
  const movingUp = cursors.up.isDown;

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
    player.setVelocityY(-400);
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
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
