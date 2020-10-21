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
  var gameTimer = 180;
  var timedEvent;
  var gameTimerEvent;
  var roundComplete = false;
  var hackers;
  var platformBarriers;
  var lastBombRelease = 180;
  var bombCount = 0;
  var firewallPowerups;
  var architectPowerups;
  var firewallUp = false;
  var allowBombs = false;
  var rocketCollider;
  var preLaunchComplete = false;
  var hasArchitect = false;
  var hasDataBomb = false;
  var numberOfArchitects = 0;
  var numberOfDataBombs = 0;
  var hasFirewall = false;
  var gameNotStarted = true;

  var game = new Phaser.Game(config);

  function preload() {
    this.load.image("background", "assets/matrix.png");
    // this.load.image(
    //   "background_conflict",
    //   "assets/matrix_merge_conflict.png"
    // );
    this.load.image("rocket", "assets/rocket_small.png");
    this.load.image("console_background", "assets/console_background.png");
    this.load.image("platform_small", "assets/platform_small.png");
    this.load.image("rocket_platform", "assets/rocket_platform.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("bug", "assets/bug.png");
    this.load.image("bomb", "assets/bomb_new.png");
    this.load.image("door", "assets/door.png");
    this.load.image("firewallPowerup", "assets/firewall.png");
    this.load.image("firewallIcon", "assets/firewall_icon.png");
    this.load.image("firewallIcon_grey", "assets/firewall_icon_grey.png");
    this.load.image("architectPowerup", "assets/architect_powerup.png");
    this.load.image("architectIcon", "assets/architect_icon.png");
    this.load.image("architectIcon_grey", "assets/architect_icon_grey.png");
    this.load.image("dataBomb", "assets/sql.png");
    this.load.image("sqlIcon", "assets/sql_icon.png");
    this.load.image("sqlIcon_grey", "assets/sql_icon_grey.png");
    this.load.image("switch_red", "assets/switch_red.png");
    this.load.image("switch_green", "assets/switch_green.png");
    this.load.image("barrier", "assets/platform_barrier.png");

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
  }

//   function create() {
//     this.add.image(400, 300, "background");
//     //this.add.image(400, 300, "background_conflict");

//     //Architect Keypress
//     this.input.keyboard.on('keydown_A', function () {
//       if (hasArchitect) {
//         revealArchitect();
//       } else {
//         console.log("Architect not available");
//       }
//     });

//     //Data Bomb Keypress
//     this.input.keyboard.on('keydown_S', function () {
//       if (hasDataBomb) {
//         useDataBomb();
//       } else {
//         console.log("Data Bomb not available");
//       }
//     });

//     //Firewall keypress
//     this.input.keyboard.on('keydown_D', function () {
//       if (hasFirewall) {
//         activateFirewall();
//       } else {
//         console.log("Firewall not available");
//       }
//     });

//     //Launch keypress
//     this.input.keyboard.on('keydown_W', function () {
//       launchRocket();
//     });

//     //Start Game keypress
//     this.input.keyboard.on('keydown_ENTER', function () {
//       if (gameNotStarted) {
//         roundOne();
//       } else {
//         console.log("Game is running");
//       }
//     });

//     // Countdown Timer
//     timedEvent = this.time.addEvent({
//       delay: 1000,
//       callback: decrementCountdown,
//       callbackScope: this,
//       loop: true,
//     });

//     // Game timer
//     timedEvent = this.time.addEvent({
//       delay: 1000,
//       callback: decrementGameTimer,
//       callbackScope: this,
//       loop: true,
//     });

//     //Available Powerup Symbols
//     architectIcon = this.physics.add.sprite(30, 30, "architectIcon_grey");
//     architectIcon.setGravityY(-300);
//     architectIcon.visible = true;

//     sqlIcon = this.physics.add.sprite(80, 30, "sqlIcon_grey");
//     sqlIcon.setGravityY(-300);
//     sqlIcon.visible = true;

//     firewallIcon = this.physics.add.sprite(130, 30, "firewallIcon_grey");
//     firewallIcon.setGravityY(-300);
//     firewallIcon.visible = true;

//     //Rocket
//     rocket = this.physics.add.sprite(400, 592, "rocket");
//     rocket.setGravityY(-300);

//     //Console Background
//     this.add.image(400, 645, "console_background");

//     //Console Text
//     consoleText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project> Press ENTER to execute PushToProd ..."]);
//     consoleText.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       backgroundColor: "black",
//     });
//     consoleText.visible = true;

//     consoleDefaultText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project>"]);
//     consoleDefaultText.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       backgroundColor: "black",
//     });
//     consoleDefaultText.visible = false;

//     //Architect Platform
//     architectPlatform = this.physics.add.sprite(400, -25, "platform_small");
//     architectPlatform.setGravityY(-300);

//     //Rocket Platform
//     rocketPlatform = this.physics.add.staticGroup();
//     rocketPlatform.create(400, 505, "rocket_platform");

//     //Door
//     door = this.physics.add.staticGroup();
//     door.create(100, 500, "door");

//     //Red Switch
//     redSwitch = this.physics.add.staticGroup();
//     redSwitch.create(140, 520, "switch_red");

//     //Green Switch
//     greenSwitch = this.physics.add.sprite(140, 520, "switch_green");
//     greenSwitch.setGravityY(-300);
//     greenSwitch.visible = false;

//     //Platforms
//     platforms = this.physics.add.staticGroup();

//     platforms.create(400, 568, "ground").setScale(2).refreshBody();

//     platforms.create(700, 375, "ground");
//     platforms.create(100, 375, "ground");
//     platforms.create(850, 220, "ground");
//     platforms.create(-50, 220, "ground");

//     //Barriers
//     platformBarriers = this.physics.add.staticGroup();
//     platformBarriers.create(630, 175, "barrier", null, false, true);
//     platformBarriers.create(815, 175, "barrier", null, false, true);
//     platformBarriers.create(170, 175, "barrier", null, false, true);
//     platformBarriers.create(-15, 175, "barrier", null, false, true);
//     platformBarriers.create(320, 330, "barrier", null, false, true);
//     platformBarriers.create(-15, 330, "barrier", null, false, true);
//     platformBarriers.create(480, 330, "barrier", null, false, true);
//     platformBarriers.create(815, 330, "barrier", null, false, true);
//     platformBarriers.create(-15, 510, "barrier", null, false, true);
//     platformBarriers.create(815, 510, "barrier", null, false, true);
//     platformBarriers.create(398, 260, "barrier", null, false, true);
//     platformBarriers.create(398, 140, "barrier", null, false, true);
//     platformBarriers.create(398, -120, "barrier", null, false, true);

//     //Player
//     player = this.physics.add.sprite(100, 510, "jepack_dude");

//     player.setBounce(0.2);
//     player.setCollideWorldBounds(true);

//     //Player Animations
//     this.anims.create({
//       key: "left",
//       frames: this.anims.generateFrameNumbers("jepack_dude", {
//         start: 0,
//         end: 14,
//       }),
//       frameRate: 25,
//       repeat: -1,
//     });

//     this.anims.create({
//       key: "turn_right",
//       frames: [{ key: "turn_right", frame: 0 }],
//       frameRate: 20,
//     });

//     this.anims.create({
//       key: "turn_left",
//       frames: [{ key: "turn_left", frame: 0 }],
//       frameRate: 20,
//     });

//     this.anims.create({
//       key: "right",
//       frames: this.anims.generateFrameNumbers("jepack_dude", {
//         start: 16,
//         end: 31,
//       }),
//       frameRate: 25,
//       repeat: -1,
//     });

//     this.anims.create({
//       key: "jump_right",
//       frames: this.anims.generateFrameNumbers("jump_right", {
//         start: 0,
//         end: 0,
//       }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     this.anims.create({
//       key: "jump_left",
//       frames: this.anims.generateFrameNumbers("jump_left", {
//         start: 0,
//         end: 0,
//       }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     //Hacker
//     hackers = this.physics.add.group();

//     //Architect
//     architect = this.physics.add.sprite(400, -60, "architect");
//     architect.setGravityY(-300);

//     //TODO: Clean Up Hacker Animations
//     this.anims.create({
//       key: "hacker_left",
//       frames: this.anims.generateFrameNumbers("hacker_left", {
//         start: 0,
//         end: 9,
//       }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     this.anims.create({
//       key: "hacker_right",
//       frames: this.anims.generateFrameNumbers("hacker_right", {
//         start: 0,
//         end: 9,
//       }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     //Architect
//     this.anims.create({
//       key: "architect_idle",
//       frames: [{ key: "architect", frame: 0 }],
//       frameRate: 20,
//     });
//     this.anims.create({
//       key: "architect_action",
//       frames: this.anims.generateFrameNumbers("architect", {
//         start: 0,
//         end: 29,
//       }),
//       frameRate: 15,
//       repeat: -1,
//     });

//     //Effects Animations
//     this.anims.create({
//       key: "flame",
//       frames: this.anims.generateFrameNumbers("flame", {
//         start: 0,
//         end: 6,
//       }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     this.anims.create({
//       key: "portal",
//       frames: this.anims.generateFrameNumbers("portal", {
//         start: 0,
//         end: 15,
//       }),
//       frameRate: 10,
//       repeat: -1,
//     });


//     this.anims.create({
//       key: "explosion",
//       frames: this.anims.generateFrameNumbers("explosion", {
//         start: 0,
//         end: 64,
//       }),
//       frameRate: 50,
//       repeat: -1,
//     });


//     this.anims.create({
//       key: "bomb_sprite",
//       frames: this.anims.generateFrameNumbers("bomb_sprite", {
//         start: 0,
//         end: 7,
//       }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     this.anims.create({
//       key: "bug",
//       frames: [{ key: "bug", frame: 0 }],
//       frameRate: 20,
//     });

//     //Enable Keyboard Inputs
//     cursors = this.input.keyboard.createCursorKeys();

//     //Bugs
//     bugs = this.physics.add.group({
//       key: "bug",
//       //Will create 12 bugs total, 1 original and 12 children
//       repeat: 11,
//       //Placement of generated bugs
//       setXY: { x: 12, y: -20, stepX: 70 },
//     });

//     bugs.children.iterate(function (child) {
//       child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
//       //Gravity can be overridden on a body from the value set in the config above
//       child.setGravityY(400);
//       child.disableBody(true);
//     });

//     //Bombs
//     bombs = this.physics.add.group();

//     //FireWall PowerUp
//     firewallPowerups = this.physics.add.group();

//     //Architect Powerup
//     architectPowerups = this.physics.add.group();

//     //Architect Powerup
//     dataBombs = this.physics.add.group();

//     //Adds the collision between the objects and the platforms
//     this.physics.add.collider(player, platforms);
//     this.physics.add.collider(hackers, platforms);
//     this.physics.add.collider(hackers, platformBarriers);
//     rocketCollider = this.physics.add.collider(
//       rocket,
//       platformBarriers,
//       rocketPreLaunch,
//       null,
//       this
//     );
//     this.physics.add.collider(bugs, platforms);
//     this.physics.add.collider(bombs, platforms);
//     this.physics.add.collider(firewallPowerups, platforms);
//     this.physics.add.collider(architectPowerups, platforms);
//     this.physics.add.collider(dataBombs, platforms);
//     this.physics.add.collider(player, hackers);
//     this.physics.add.collider(player, bombs, hitBomb, null, this);
//     this.physics.add.collider(architectPlatform, platformBarriers);
//     this.physics.add.collider(architect, architectPlatform);
//     this.physics.add.collider(architect, platformBarriers);
//     this.physics.add.collider(bugs, bugs);

//     //Overlaps Events
//     this.physics.add.overlap(player, bugs, squashBugs, null, this);
//     this.physics.add.overlap(player, firewallPowerups, enableFirewall, null, this);
//     this.physics.add.overlap(player, architectPowerups, addArchitectPowerup, null, this);
//     this.physics.add.overlap(player, dataBombs, addDataBomb, null, this);

//     //Bug Count
//     //bugText = this.add.text(16, 16, "Bugs: 12", {
//     //fontSize: "20px",
//     //fill: "#FFFFFF",
//     //});

//     //Round
//     roundText = this.add.text(675, 16, "Round: 1", {
//       fontSize: "20px",
//       fill: "#FFFFFF",
//     });
//     roundText.visible = false;

//     //Start Round One Text
//     startRoundOne = this.add.text(15, 615, [
//       "Message: Go-Live Attempt Number: 17",
//       "         Please resolve all issues reported by the client immediately.",
//       "",
//       "Info:    Squashing bugs ...",
//     ]);
//     startRoundOne.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       backgroundColor: "black",
//     });
//     startRoundOne.visible = false;

//     //End Round One Text
//     endRoundOne = this.add.text(15, 615, [
//       "Message: Issues resolved ...",
//       "         Unfortunately, the client's internal dev team introduced some new ones.",
//       "Info:    Fixing someone else's problems ...",
//     ]);
//     endRoundOne.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       backgroundColor: "black",
//     });
//     endRoundOne.visible = false;

//     //End Round Two Text
//     endRoundTwo = this.add.text(15, 615, [
//       "Warning: Intruder Alert",
//       "         Malfeasance detected in the repository",
//       "         The firewall must be configured",
//       "         Do not touch any code dropped by the intruders",
//     ]);
//     endRoundTwo.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       color: "red",
//       backgroundColor: "yellow",
//     });
//     endRoundTwo.visible = false;

//     //End Round Three Text
//     endRoundThree = this.add.text(15, 615, [
//       "Info:      Go-Live Date #47",
//       "Message:   A recent merge conflict resolution by a junior dev left has set us back again",
//     ]);
//     endRoundThree.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       backgroundColor: "black",
//     });
//     endRoundThree.visible = false;

//     //End Round Four Text
//     endRoundFour = this.add.text(15, 615, [
//       "Message: The FINAL final list of issues inbound from client",
//       "Info:    This is highly unlikely",
//     ]);
//     endRoundFour.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       backgroundColor: "black",
//     });
//     endRoundFour.visible = false;

//     //End Round Five Text
//     endRoundFive = this.add.text(15, 615, [
//       "Message: Issues Resolved, Site Secure, To-Do's finished",
//       "         Project is ready for PROD",
//       "         For the love of God, please launch the project",
//       "         before the client asks for new features"
//     ]);
//     endRoundFive.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       backgroundColor: "black",
//     });
//     endRoundFive.visible = false;

//     //Summon Architect Text
//     summonArchitectText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project> -summon Architect"]);
//     summonArchitectText.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       color: "yellow",
//       backgroundColor: "black",
//     });
//     summonArchitectText.visible = false;

//     //Summon Architect Text
//     enableFirewallText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project> Press 'F' to enable firewall ..."]);
//     enableFirewallText.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       color: "yellow",
//       backgroundColor: "black",
//     });
//     enableFirewallText.visible = false;

//     //Launch Text
//     launchText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project> Press 'W' to launch the project ..."]);
//     launchText.setStyle({
//       fontSize: "14px",
//       fontFamily: "Courier",
//       align: "left",
//       color: "yellow",
//       backgroundColor: "black",
//     });
//     launchText.visible = false;

//     //Timer Text
//     intermissionTimerText = this.add.text(375, 175, [countDown]);
//     intermissionTimerText.setStyle({
//       fontSize: "64px",
//       fontFamily: "Courier",
//       align: "center",
//     });
//     intermissionTimerText.visible = false;

//     //Game Timer Text
//     gameTimerText = this.add.text(375, 16, [formatTime(gameTimer)]);
//     gameTimerText.setStyle({
//       fontSize: "20px",
//       fontFamily: "Courier",
//       align: "center",
//     });
//     gameTimerText.visible = false;
//   }

//   function update() {
//     if (cursors.left.isDown) {
//       facingRight = false;
//       player.setVelocityX(-160);

//       if (player.body.touching.down) {
//         player.anims.play("left", true);
//       } else {
//         player.anims.play("jump_left", true);
//       }
//     } else if (cursors.right.isDown) {
//       facingRight = true;
//       player.setVelocityX(160);

//       if (player.body.touching.down) {
//         player.anims.play("right", true);
//       } else {
//         player.anims.play("jump_right", true);
//       }
//     } else {
//       if (facingRight) {
//         player.anims.play("turn_right");
//       } else {
//         player.anims.play("turn_left");
//       }
//       player.setVelocityX(0);
//     }

//     //Jump
//     //Check to see if Up Key is depressed AND if player body is touching solid ground
//     if (cursors.up.isDown) {
//       if (facingRight) {
//         player.anims.play("jump_right", true);
//       } else {
//         player.anims.play("jump_left", true);
//       }

//       if (player.body.touching.down) {
//         player.setVelocityY(-330);
//       }
//     }

//     //Hacker Movements
//     hackers.children.iterate(function (child) {
//       if (child.body.touching.right) {
//         console.log("hacker touch right");
//         child.setVelocityX(-80);
//         child.anims.play("hacker_left", true);
//       }

//       if (child.body.touching.left) {
//         console.log("hacker touch left");
//         child.setVelocityX(80);
//         child.anims.play("hacker_right", true);
//       }
//     });

//     //Drop Hacker Bombs
//     if (hackers.countActive(true) > 0) {
//       var GetAll = Phaser.Utils.Array.GetAll;
//       var GetRandom = Phaser.Utils.Array.GetRandom;

//       var hacker = GetRandom(GetAll(hackers.getChildren(), "active", true));

//       var x = hacker.x;
//       var y = hacker.y;

//       if (
//         lastBombRelease - gameTimer > 5 &&
//         bombCount <= 4 &&
//         allowBombs &&
//         !firewallUp
//       ) {
//         var bomb = bombs.create(x, y, "bomb");
//         //bomb.anims.play("bomb_sprite", true)
//         bomb.setBounce(1);
//         bomb.setCollideWorldBounds(true);
//         bomb.setVelocity(Phaser.Math.Between(-200, 200), 80);
//         lastBombRelease = gameTimer;
//         bombCount++;
//       }
//     }
//   }

  function squashBugs(player, bug) {
    console.log("Squashed Bug");

    bug.disableBody(true, true);

    bugCount -= 1;

    if (bugs.countActive(true) === 0) {
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
          rocket.setGravityY(-400);
          greenSwitch.visible = true;
          endRoundFive.visible = true;
          break;
      }
    }
  }

//   function roundOne() {
//     consoleText.visible = false;
//     startRoundOne.visible = true;
//     gameNotStarted = false;
//     bugCount = 12;
//     round = 1;
//     roundText.setText("Round: " + round);
//     gameTimerText.visible = true;
//     roundText.visible = true;

//     bugs.children.iterate(function (child) {
//       child.anims.play("bug", true);
//       child.enableBody(true, child.x, 0, true, true);
//       child.setGravityY(0);
//     });
//   }

//   function roundTwo(player, bug) {
//     console.log("Start Round 2");
//     startRoundOne.visible = false;;

//     intermissionTimer();

//     gameTimerText.visible = false;
//     roundText.visible = false;

//     endRoundOne.visible = true;

//     beginNext();

//     function beginNext() {
//       setTimeout(function () {
//         endRoundOne.visible = false;
//         consoleDefaultText.visible = true;
//         bugCount = 12;
//         round = 2;
//         roundText.setText("Round: " + round);
//         gameTimerText.visible = true;
//         roundText.visible = true;

//         bugs.children.iterate(function (child) {
//           child.anims.play("bug", true);
//           child.enableBody(true, child.x, 0, true, true);
//           child.setBounceY(Phaser.Math.FloatBetween(0.9, 1));
//           child.setGravityY(0);
//         });
//       }, 10500);
//     }
//   }

//   function roundThree(player, bug) {
//     console.log("Start Round 3");

//     intermissionTimer();

//     gameTimerText.visible = false;
//     roundText.visible = false;

//     endRoundTwo.visible = true;

//     beginNext();

//     function beginNext() {
//       setTimeout(function () {
//         endRoundTwo.visible = false;
//         consoleDefaultText.visible = true;
//         bugCount = 12;
//         round = 3;
//         roundText.setText("Round: " + round);

//         gameTimerText.visible = true;
//         roundText.visible = true;

//         spawnHacker();
//       }, 10500);
//     }
//   }

//   function roundFour(player, bug) {
//     console.log("Start Round 4");

//     intermissionTimer();

//     gameTimerText.visible = false;
//     roundText.visible = false;

//     endRoundThree.visible = true;

//     beginNext();

//     function beginNext() {
//       setTimeout(function () {
//         endRoundThree.visible = false;
//         consoleDefaultText.visible = true;
//         bugCount = 12;
//         round = 4;
//         roundText.setText("Round: " + round);

//         gameTimerText.visible = true;
//         roundText.visible = true;

//         bugs.children.iterate(function (child) {
//           child.anims.play("bug", true);
//           child.enableBody(true, child.x, 0, true, true);
//           child.setBounce(1);
//           child.setCollideWorldBounds(true);
//           child.setVelocity(Phaser.Math.Between(-200, 200), 20);
//           child.setGravityY(0);
//         });
//       }, 10500);
//     }
//   }

//   function roundFive(player, bug) {
//     console.log("Start Round 5");

//     intermissionTimer();

//     gameTimerText.visible = false;
//     roundText.visible = false;

//     endRoundFour.visible = true;

//     beginNext();

//     function beginNext() {
//       setTimeout(function () {
//         endRoundFour.visible = false;
//         consoleDefaultText.visible = true;
//         bugCount = 12;
//         round = 5;
//         roundText.setText("Round: " + round);

//         gameTimerText.visible = true;
//         roundText.visible = true;

//         //TODO: New Enemy Patterns & Add Hackers
//         bugs.children.iterate(function (child) {
//           child.anims.play("bug", true);
//           child.enableBody(true, child.x, 0, true, true);
//           child.setBounce(1);
//           child.setCollideWorldBounds(true);
//           child.setVelocity(Phaser.Math.Between(-200, 200), 20);
//           child.setGravityY(0);
//         });
//       }, 10500);
//     }
//   }

//   function intermissionTimer(player, bug) {
//     console.log("Intermission Timer Started");
//     countDown = 11;

//     //Gives a 40% chance of getting an Architect Powerup
//     var dropArchitectPower = Math.random() >= 0.60;

//     if (!hasArchitect && dropArchitectPower && numberOfArchitects <= 1) {
//       dropArchitectPowerup();
//     }

//     //Gives a 33% chance of getting a Data Bomb
//     var dropDataPowerup = Math.random() >= 0.66;

//     if (!hasDataBomb && dropDataPowerup && numberOfDataBombs == 0) {
//       dropDataBomb();
//     }
//   }

//   function decrementCountdown() {
//     countDown -= 1; // One second
//     intermissionTimerText.setText(countDown);

//     if (countDown <= 3 && roundComplete) {
//       intermissionTimerText.visible = true;
//     }

//     if (countDown <= 0) {
//       intermissionTimerText.visible = false;
//     }
//   }

//   function decrementGameTimer() {
//     if (gameTimerText.visible === true) {
//       gameTimer -= 1; // One second
//       gameTimerText.setText(formatTime(gameTimer));
//     }
//   }

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

    function dropPowerUp(x, y) {
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
  }

  function dropArchitectPowerup() {

    var powerUp = architectPowerups.create(
      Phaser.Math.Between(0, 800),
      0,
      "architectPowerup"
    );
    powerUp.setBounce(1);
    powerUp.setGravityY(-100);
    powerUp.setCollideWorldBounds(true);
    powerUp.setVelocity(Phaser.Math.Between(-300, 300), 20);

    setTimeout(function () {
      powerUp.disableBody(true, true);
    }, 7500);
  }

  function dropDataBomb() {
    var powerUp = dataBombs.create(
      Phaser.Math.Between(0, 800),
      0,
      "dataBomb"
    );
    powerUp.setBounce(1);
    powerUp.setGravityY(-100);
    powerUp.setCollideWorldBounds(true);
    powerUp.setVelocity(Phaser.Math.Between(-300, 300), 20);

    setTimeout(function () {
      powerUp.disableBody(true, true);
    }, 7500);
  }

  function hitBomb(player, bomb) {
    console.log("Hit Bomb");

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
  }

  function useDataBomb() {
    hasDataBomb = false;
    sqlIcon.setTexture('sqlIcon_grey');

    //TODO: POWER EFFECT - LARGE EXPLOSION WIPES ENTIRE BOARD
  }

  function enableFirewall(player, powerup) {
    powerup.disableBody(true, true);
    hasFirewall = true;
    enableFirewallText.visible = true;
    firewallIcon.setTexture('firewallIcon');
  }

  function activateFirewall() {
    firewallUp = true;
    allowBombs = false;
    hasFirewall = false;
    enableFirewallText.visible = false;
    firewallIcon.setTexture('firewallIcon_grey');

    hackers.children.iterate(function (child) {
      child.setVelocityX(0);
      child.anims.play("flame", true);

      setTimeout(function () {
        child.disableBody(true, true);
        roundFour();
      }, 750);
    });

    bombs.children.iterate(function (child) {
      child.setVelocityX(0);
      child.anims.play("flame", true);

      setTimeout(function () {
        child.disableBody(true, true);
      }, 750);
    });
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

  function addArchitectPowerup(player, architectPowerup) {
    hasArchitect = true;
    architectPowerup.disableBody(true, true);
    numberOfArchitects++;
    architectIcon.setTexture('architectIcon');
  }

  function addDataBomb(player, dataBomb) {
    hasDataBomb = true;
    dataBomb.disableBody(true, true);
    numberOfDataBombs++;
    sqlIcon.setTexture('sqlIcon');
  }

  function revealArchitect() {

    if (hasArchitect) {
      hasArchitect = false;
      summonArchitectText.visible = true;
      architectIcon.setTexture('architectIcon_grey');
      architectPlatform.setGravityY(-250);
      architect.setGravityY(-250);

      setTimeout(function () {
        architect.anims.play("architect_action", true);
      }, 1500);

      setTimeout(function () {
        console.log("Begin architect effect");
        architectEffect();
      }, 2500);
    }
  }

  function dismissArchitect() {
    summonArchitectText.visible = false;
    architectPlatform.setGravityY(-500);
    architect.anims.play("architect_action", false);
  }

  function explodeBug(child) {
    child.anims.play("explosion", true);
    setTimeout(function () {
      child.disableBody(true, true);
      bugCount--;
    }, Phaser.Math.Between(250, 1250));
  }

  function architectEffect() {
    setTimeout(function () {

      bugs.children.iterate(function (child) {
        var result = Math.random() >= 0.4;
        if (result) {
          explodeBug(child);
        }
      });
    }, 2000);

    setTimeout(function () {
      dismissArchitect();
    }, 2000);
  }

//   function formatTime(seconds) {
//     // Minutes
//     var minutes = Math.floor(seconds / 60);
//     // Seconds
//     var partInSeconds = seconds % 60;
//     // Adds left zeros to seconds
//     partInSeconds = partInSeconds.toString().padStart(2, "0");
//     // Returns formated time
//     return `${minutes}:${partInSeconds}`;
//   }