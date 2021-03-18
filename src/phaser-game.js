var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  canvas: document.querySelector("canvas"),
};

var player;
var bugs;
var platforms;
var cursors;
var bombs;
var bugCount = 12;
var endRoundOne;
var endRoundTwo;
var round = 1;
var roundText;
var cameras = this.cameras;
var launched = false;
var facingRight = true;
var countDown = 10;
var gameTimer = 0;
var timedEvent;
var gameTimerEvent;
var roundComplete = false;
var hackers;
var platformBarriers;
var codeBlockBarriers;
var lastBombRelease = 0;
var bombCount = 0;
var firewallPowerups;
var architectPowerups;
var firewallUp = false;
var fireWallCount = 0;
var allowBombs = false;
var rocketCollider;
var preLaunchComplete = false;
var hasArchitect = false;
var hasAntiGravity = false;
var numberOfArchitects = 0;
var numberOfAntiGravityPowerups = 0;
var hasFirewall = false;
var gameNotStarted = true;
var isMergeConflict = false;
var mergeConflictShown = false;
var lastBugSpawn = 0;
var antiGravityEnabled = false;
var isEndGame = false;
var conflictsResolved = 4;
var roundFiveStarted = false;


var game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/matrix.png");
  this.load.image(
    "background_conflict",
    "assets/matrix_merge_conflict.png"
  );
  this.load.image("rocket", "assets/rocket_small.png");
  this.load.image("console_background", "assets/console_background.png");
  this.load.image("platform_small", "assets/platform_small.png");
  this.load.image("rocket_platform", "assets/rocket_platform.png");
  this.load.image("ground", "assets/platform.png");
  //this.load.image("bug", "assets/bug_sprites.png");
  this.load.image("bomb", "assets/bomb_new.png");
  this.load.image("feature", "assets/feature_bomb.png");
  this.load.image("door", "assets/door.png");
  this.load.image("firewallPowerup", "assets/firewall.png");
  this.load.image("firewallIcon", "assets/firewall_icon.png");
  this.load.image("firewallIcon_grey", "assets/firewall_icon_grey.png");
  this.load.image("firewallIcon_half", "assets/firewall_icon_half.png");
  this.load.image("architectPowerup", "assets/architect_powerup.png");
  this.load.image("architectIcon", "assets/architect_icon.png");
  this.load.image("architectIcon_grey", "assets/architect_icon_grey.png");
  //TODO: CREATE NEW SPRITES
  this.load.image("antiGravityPowerup", "assets/jetpack.png");
  this.load.image("sqlIcon", "assets/sql_icon.png");
  this.load.image("sqlIcon_grey", "assets/sql_icon_grey.png");
  this.load.image("jetpackIcon", "assets/jetpack_icon.png");
  this.load.image("jetpackIcon_grey", "assets/jetpack_icon_grey.png");
  this.load.image("switch_red", "assets/switch_red.png");
  this.load.image("switch_green", "assets/switch_green.png");
  this.load.image("barrier", "assets/platform_barrier.png");
  this.load.image("left_barrier", "assets/left_barrier.png");
  this.load.image("code_block_barrier", "assets/code_block_barrier.png");
  this.load.image("code_block", "assets/resized_code_block_breakable.png");
  this.load.image("im_busy", "assets/im_busy.png");

  this.load.spritesheet("bug_right", "assets/bug_sprites_right.png", {
    frameWidth: 30,
    frameHeight: 24,
  });
  this.load.spritesheet("bug_left", "assets/bug_sprites_left.png", {
    frameWidth: 30,
    frameHeight: 24,
  });
  this.load.spritesheet("bomb_sprite", "assets/bomb_sprite.png", {
    frameWidth: 15,
    frameHeight: 15,
  });
  this.load.spritesheet("hacker_right", "assets/hacker_right.png", {
    frameWidth: 35,
    frameHeight: 48,
  });
  this.load.spritesheet("hacker_left", "assets/hacker_left.png", {
    frameWidth: 35,
    frameHeight: 48,
  });
  this.load.spritesheet("flame", "assets/flame_up.png", {
    frameWidth: 35,
    frameHeight: 48,
  });
  this.load.spritesheet("jepack_dude", "assets/jetpack_run_long.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("jump_right", "assets/jump_right.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("jump_left", "assets/jump_left.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("turn_right", "assets/turn_right.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("turn_left", "assets/turn_left.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("portal", "assets/portal.png", {
    frameWidth: 50,
    frameHeight: 60,
  });
  this.load.spritesheet("architect", "assets/architect.png", {
    frameWidth: 49,
    frameHeight: 49,
  });
  this.load.spritesheet("explosion", "assets/explosion.png", {
    frameWidth: 49,
    frameHeight: 49,
  });
  this.load.spritesheet("code_block_animation", "assets/code_block_animation.png", {
    frameWidth: 35,
    frameHeight: 35,
  });
  this.load.spritesheet("brick_break", "assets/resized_BrickBreak.png", {
    frameWidth: 40,
    frameHeight: 40,
  });
}

function squashBugs(player, bug) {
  console.log("Squashed Bug");

  if (bug != null) {
    bug.disableBody(true, true);
  }

  bugCount -= 1;

  if (round === 5) {
    finalRoundCount.setText("Bugs Remaining: " + bugCount)
    finalRoundCount.visible = true;
  }

  if (bugCount <= 0) {
    bugs.children.iterate(function (child) {
      disableItem(child);
    })

    if (round === 5) {
      isEndGame = true;
    }
  }

  if (bugs.countActive(true) <= 0) {
    switch (round) {
      case 1:
        roundComplete = true;
        roundTwo(player, bug);
        break;

      case 2:
        roundThree(player, bug);
        break;

      //Case 3 will never be hit because there are no bugs in the hacker round

      case 4:
        roundFive(player, bug);
        break;

      case 5:
        if (bugCount <= 0) {
          rocket.setGravityY(-400);
          greenSwitch.visible = true;
          endRoundFive.visible = true;
        }
        break;
    }
  }
}

function spawnHacker() {
  var coordinates = [
    [80, 150],
    [640, 310],
    [240, 310],
    [150, 510],
    [700, 175],
  ];

  for (var i = 0; i < 3; i++) {
    var item = Phaser.Utils.Array.RemoveRandomElement(coordinates);

    var hacker = hackers.create(item[0], item[1], "dude");
    hacker.setBounce(0.2);
    hacker.setCollideWorldBounds(true);

    hacker.anims.play("portal", true);
  }

  hackers.children.iterate(function (child) {
    var right = Math.random() >= 0.5;

    setTimeout(function () {
      if (right) {
        child.setVelocityX(80);
        child.anims.play("hacker_right", true);

        if (!allowBombs) {
          allowBombs = true;
        }
      } else {
        child.setVelocityX(-80);
        child.anims.play("hacker_left", true);

        if (!allowBombs) {
          allowBombs = true;
        }
      }
    }, 1500);
  });

  dropPowerUp();
}

function dropPowerUp() {
  setTimeout(function () {
    var powerUp = firewallPowerups.create(
      Phaser.Math.Between(0, 800),
      0,
      "firewallPowerup"
    );
    powerUp.setBounce(1);
    powerUp.setGravityY(-200);
    powerUp.setCollideWorldBounds(true);
    powerUp.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }, 2000);
}

function hitBomb(player, bomb) {
  console.log("Hit Bomb");

  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  gameOver = true;
}

function hitFeature(player, feature) {
  feature.disableBody(true, true);
  bugCount += 2;
  finalRoundCount.setText("Bugs Remaining: " + bugCount)
  finalRoundCount.visible = true;
}

function disableItem(item) {
  item.disableBody(true, true);
}

function launchRocket() {
  if (bugCount <= 0 && round === 5 && !launched && preLaunchComplete) {
    //countDown = 3;

    setTimeout(function () {
      //this.cameras.main.shake(500);
      rocket.setVelocityY(-600);
      launched = true;
    }, 1000);
  }
}

function rocketPreLaunch(rocket, platformBarriers) {
  console.log("Pre-Launch started");
  rocket.setGravityY(-300);

  this.physics.world.removeCollider(rocketCollider);

  preLaunchComplete = true;

  setTimeout(function () {
    endRoundFive.visible = false;
    launchText.visible = true;
  }, 5000);
}

function bounceOffCodeBlock(codeBlock, barrier){
  codeBlock.setGravityY(-100);
  codeBlock.setVelocity(0, -200);
}