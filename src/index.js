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
let middleColumn = [];
let sideColumn = [];
let player;
let camera;
let shouldMoveCamera;

function create() {
  // Adding Background
  this.add.image(400, 300, 'sky')
    .setScrollFactor(1, 0);

  // Adding Platforms
  platforms = this.physics.add.staticGroup();


  let floorX;
  for (let i = 0; i < 6; i += 1){
    const columnSelector = i % 2;
    let x;
    let platform;
    const y = 600 - (146 * i); // Start generating platforms at bottom
    switch (columnSelector) {
      case 0:
        x = Phaser.Math.Between(350, 450); 
        if (i === 0) floorX = x;
        platform = platforms.create(x, y, 'platform');
        middleColumn.push(platform);
        break;
      case 1:
        const randomBool = Math.random() >= 0.5;
        x = randomBool ? 
          Phaser.Math.Between(550, 650) :
          Phaser.Math.Between(150, 250);
        platform = platforms.create(x, y, 'platform');
        sideColumn.push(platform);
        break;
    }
    platform.scaleX = 0.5;
    platform.refreshBody();
  }

  // Adding Player
  player = this.physics.add.sprite(floorX, 350, 'dude');
  player.setBounce(0.06);
  player.setCollideWorldBounds(true);
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


  if (player.y <= 300) {
    shouldMoveCamera = true;
  }

  // Camera follow
  if (shouldMoveCamera) {
    camera.scrollY = player.y - 300;
  }

  // Plafrom scrolling logic
  platforms.children.iterate( platform => {
    const scrollY = this.cameras.main.scrollY;
    if (platform.y > scrollY + 700) {
      let x;
      if (sideColumn.includes(platform)) { 
        const randomBool = Math.random() >= 0.5;
        x = randomBool ? 
          Phaser.Math.Between(550, 650) :
          Phaser.Math.Between(150, 250);
      } else {
        x = Phaser.Math.Between(350, 400);
      }
      platform.y = scrollY - 180 + Phaser.Math.Between(-20, 20);
      platform.x = x;
      platform.body.updateFromGameObject();
    }
  });
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
