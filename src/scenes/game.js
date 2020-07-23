import Phaser from 'phaser';
import MovingPlatform from '../MovingPlatform';

export default class MainGame extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
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

  addPlatforms() {
    this.platforms = this.physics.add.group();

    for (let i = 0; i < 6; i += 1) {
      const y = 600 - (146 * i); // Start generating platforms at bottom
      const centerPlatform = i % 2 === 0;

      const platform = new MovingPlatform(this, centerPlatform, y, 'platform', {
        isStatic: true,
      });

      this.platforms.add(platform);
      platform.scaleX = 0.5;
      platform.setupFriction();
      platform.refreshBody();

      if (i === 0) this.startX = platform.x; // Starting platform x
    }
  }

  addPlayer() {
    this.player = this.physics.add.sprite(this.startX, 500, 'dude');
    this.player.setBounce(0.06);
    this.player.setCollideWorldBounds(true);
    this.player.setFrictionX(0);

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
  }

  create() {
    // Adding Background
    this.add.image(400, 300, 'sky')
      .setScrollFactor(1, 0);

    // Adding Platforms
    this.addPlatforms()
  
    // Adding Player
    this.addPlayer();
  
    // Adding sprites interaction
    this.physics.add.collider(this.player, this.platforms);
    this.physics.world.checkCollision.up = false;

    // Setting up Camera
    this.camera = this.cameras.main;
  }

  handleScrollDeath() {
    this.scene.pause();
    this.scene.start('death', { endingX: this.player.x });
  }

  checkScrollDeath() {
    if (this.player.body.blocked.down) this.handleScrollDeath();
  }

  updateMovementStatus() {
    const cursors = this.input.keyboard.createCursorKeys();

    this.movingRight = cursors.right.isDown;
    this.movingLeft = cursors.left.isDown;
    this.movingUp = cursors.up.isDown;
    this.movingDown = cursors.down.isDown;
  }

  movePlayer() {
    if (this.movingRight) {
      this.player.anims.play('right', true);
      if (this.player.body.touching.down) {
        this.player.setVelocityX(160);
      } else if (this.player.body.velocity.x <= 0) {
        this.player.setVelocityX(85);
      }
    } else if (this.movingLeft) {
      this.player.anims.play('left', true);
      if (this.player.body.touching.down) {
        this.player.setVelocityX(-160);
      } else if (this.player.body.velocity.x >= 0) {
        this.player.setVelocityX(-85);
      }
    } else {
      this.player.anims.play('turn', true);
      this.player.setVelocityX(0);
    }
    if (this.movingUp && this.player.body.touching.down) {
      this.player.body.velocity.y -= 400;
    }
    if (this.movingDown) {
      this.player.body.velocity.y += 20;
    }
  }

  movePlatforms() {
    if (this.player.y <= 300 && this.player.body.touching.down) {
      this.platforms.children.entries.forEach(platform => {
        platform.moveVertically();
      });
    }
  }

  update() {
    // Check death condition
    this.checkScrollDeath();

    // Update movement status
    this.updateMovementStatus();

    // Move player acording to movement status
    this.movePlayer();

    // Move platforms
    this.movePlatforms();
  }
}
