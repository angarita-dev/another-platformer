import Phaser from 'phaser';

// Assets
import dudeAsset from '../assets/dude.png';
import platformAsset from '../assets/platform.png';
import skyAsset from '../assets/sky.png';
import starAsset from '../assets/star.png';

// Auxiliary classes
import PlatformManager from '../classes/platformManager';

export default class MainGame extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image('sky', skyAsset);
    this.load.image('platform', platformAsset);
    this.load.image('star', starAsset);
    this.load.spritesheet('dude',
      dudeAsset,
      { frameWidth: 32, frameHeight: 48 });
  }

  addItems() {
    this.score = 0;
    this.items = this.physics.add.group();

    // 15 585
    const img = this.add.image(20, 20, 'star');
    img.setScale(0.95, 0.95);

    // 30 578
    this.scoreText = this.add.text(40, 12, this.score, { fill: '#000', fontSize: '18px' });
    // Add animation
  }

  addItem(x, y) {
    const item = this.physics.add.sprite(x, y, 'star');
    this.items.add(item);
    item.setBounce(0.3);
  }

  collectItem(sprite, item) {
    this.score += 1;
    item.disableBody(true, true);
    this.scoreText.text = this.score;
    this.platforms.increaseDifficulty(0.10);
  }

  addPlatforms() {
    this.platforms = new PlatformManager(this.physics.world, this.scene);

    for (let i = 0; i < 6; i += 1) {
      const y = 600 - (146 * i); // Start generating platforms at bottom
      const centerPlatform = i % 2 === 0;

      const platform = this.platforms.newPlatform(this,
        centerPlatform,
        y,
        this.addItem.bind(this),
        'platform',
        {
          isStatic: true,
        });

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
    this.player.body.friction.x = 0;

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

    // Collectibles logic
    this.addItems();


    // Adding Platforms
    this.addPlatforms()
  
    // Adding Player
    this.addPlayer();

    // Adding sprites interaction
    this.physics.world.checkCollision.up = false;
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.items, this.platforms);
    this.physics.add.overlap(this.player, this.items, this.collectItem, null, this);

    // Setting up Camera
    this.camera = this.cameras.main;
  }

  handleScrollDeath() {
    this.scene.pause();
    this.scene.start('death',
      { endingX: this.player.x,
        score: this.score,
      });
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
    if (this.player.body.touching.down) this.player.jumpsAvailable = 1;
    if (this.movingRight) {
      this.player.anims.play('right', true);
      if (this.player.body.touching.down) {
        this.player.setVelocityX(160);
      } else if(this.player.body.velocity.x < 85) {
        this.player.setVelocityX(85);
      }
    } else if (this.movingLeft) {
      this.player.anims.play('left', true);
      if (this.player.body.touching.down) {
        this.player.setVelocityX(-160);
      } else if(this.player.body.velocity.x > -85) {
        this.player.setVelocityX(-85);
      }
    } else {
      this.player.anims.play('turn', true);
      this.player.setVelocityX(0);
    }
    if (this.movingUp && this.player.jumpsAvailable > 0) {
      this.player.jumpsAvailable -= 1;
      this.player.body.velocity.y -= 400;
    }
    if (this.movingDown) {
      this.player.body.velocity.y += 20;
    }
  }

  movePlatforms() {
    if (this.player.y <= 300 && this.player.body.touching.down) {
      this.platforms.moveVertically();
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
