function create() {
  this.add.image(400, 300, "background");

  //Merge Conflicts
  conflicts = this.physics.add.staticGroup();
  conflicts.create(400, 300, "background_conflict", null, false, true);
  conflicts.create(700, 375, "ground");
  conflicts.create(100, 375, "ground");
  conflicts.create(850, 220, "ground");
  conflicts.create(-50, 220, "ground");
  conflicts.children.iterate(function (child) {
    child.disableBody(true);
  })

  //Architect Keypress
  this.input.keyboard.on('keydown_A', function () {
    if (hasArchitect) {
      revealArchitect();
    } else {
      console.log("Architect not available");
    }
  });

  //AntiGravity Keypress
  this.input.keyboard.on('keydown_S', function () {
    if (hasAntiGravity) {
      useAntiGravity();
    } else {
      console.log("Data Bomb not available");
    }
  });

  //Firewall keypress
  this.input.keyboard.on('keydown_D', function () {
    if (hasFirewall) {
      activateFirewall();
    } else {
      console.log("Firewall not available");
    }
  });

  //Launch keypress
  this.input.keyboard.on('keydown_W', function () {
    launchRocket();
  });

  //Start Game keypress
  this.input.keyboard.on('keydown_ENTER', function () {
    if (gameNotStarted) {
      roundOne();
    } else {
      console.log("Game is running");
    }
  });

  // Countdown Timer
  timedEvent = this.time.addEvent({
    delay: 1000,
    callback: decrementCountdown,
    callbackScope: this,
    loop: true,
  });

  // Game timer
  timedEvent = this.time.addEvent({
    delay: 1000,
    callback: incrementGameTimer,
    callbackScope: this,
    loop: true,
  });

  //Available Powerup Symbols
  architectIcon = this.physics.add.sprite(30, 30, "architectIcon_grey");
  architectIcon.setGravityY(-300);
  architectIcon.visible = true;

  sqlIcon = this.physics.add.sprite(80, 30, "jetpackIcon_grey");
  sqlIcon.setGravityY(-300);
  sqlIcon.visible = true;

  firewallIcon = this.physics.add.sprite(130, 30, "firewallIcon_grey");
  firewallIcon.setGravityY(-300);
  firewallIcon.visible = true;

  //Rocket
  rocket = this.physics.add.sprite(400, 592, "rocket");
  rocket.setGravityY(-300);

  //Console Background
  this.add.image(400, 645, "console_background");

  //Console Text
  consoleText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project> Press ENTER to execute PushToProd ..."]);
  consoleText.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    backgroundColor: "black",
  });
  consoleText.visible = true;

  consoleDefaultText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project>"]);
  consoleDefaultText.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    backgroundColor: "black",
  });
  consoleDefaultText.visible = false;

  //Architect Platform
  architectPlatform = this.physics.add.sprite(400, -25, "platform_small");
  architectPlatform.setGravityY(-300);

  //Busy Architect
  busyArchitect = this.physics.add.sprite(460, 35, "im_busy");
  busyArchitect.setGravityY(-300);
  busyArchitect.visible  = false;

  //Rocket Platform
  rocketPlatform = this.physics.add.staticGroup();
  rocketPlatform.create(400, 505, "rocket_platform");

  //Door
  door = this.physics.add.staticGroup();
  door.create(100, 500, "door");

  //Red Switch
  redSwitch = this.physics.add.staticGroup();
  redSwitch.create(140, 520, "switch_red");

  //Green Switch
  greenSwitch = this.physics.add.sprite(140, 520, "switch_green");
  greenSwitch.setGravityY(-300);
  greenSwitch.visible = false;

  //Platforms
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  platforms.create(700, 375, "ground");
  platforms.create(100, 375, "ground");
  platforms.create(850, 220, "ground");
  platforms.create(-50, 220, "ground");

  //Barriers
  platformBarriers = this.physics.add.staticGroup();
  platformBarriers.create(630, 175, "barrier", null, false, true);
  platformBarriers.create(815, 175, "barrier", null, false, true);
  platformBarriers.create(170, 175, "barrier", null, false, true);
  platformBarriers.create(-15, 175, "barrier", null, false, true);
  platformBarriers.create(320, 330, "barrier", null, false, true);
  platformBarriers.create(-15, 330, "barrier", null, false, true);
  platformBarriers.create(480, 330, "barrier", null, false, true);
  platformBarriers.create(815, 330, "barrier", null, false, true);
  platformBarriers.create(-15, 510, "barrier", null, false, true);
  platformBarriers.create(815, 510, "barrier", null, false, true);
  platformBarriers.create(398, 260, "barrier", null, false, true);
  platformBarriers.create(398, 140, "barrier", null, false, true);
  platformBarriers.create(398, -120, "barrier", null, false, true);

  //CodeBlock Barries
  codeBlockBarriers = this.physics.add.staticGroup();
  codeBlockBarriers.create(405, 180, "code_block_barrier", null, false, true);

  //Off-Screen Barriers
  offScreenBarriers = this.physics.add.staticGroup();
  offScreenBarriers.create(-75, 350, "left_barrier", null, true, true);
  offScreenBarriers.create(875, 350, "left_barrier", null, true, true);

  //Player
  player = this.physics.add.sprite(100, 510, "jepack_dude");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //Player Animations
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("jepack_dude", {
      start: 0,
      end: 14,
    }),
    frameRate: 25,
    repeat: -1,
  });

  this.anims.create({
    key: "turn_right",
    frames: [{ key: "turn_right", frame: 0 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "turn_left",
    frames: [{ key: "turn_left", frame: 0 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("jepack_dude", {
      start: 16,
      end: 31,
    }),
    frameRate: 25,
    repeat: -1,
  });

  this.anims.create({
    key: "jump_right",
    frames: this.anims.generateFrameNumbers("jump_right", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "jump_left",
    frames: this.anims.generateFrameNumbers("jump_left", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });

  //Hacker
  hackers = this.physics.add.group();

  //Architect
  architect = this.physics.add.sprite(400, -60, "architect");
  architect.setGravityY(-300);

  //TODO: Clean Up Hacker Animations
  this.anims.create({
    key: "hacker_left",
    frames: this.anims.generateFrameNumbers("hacker_left", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "hacker_right",
    frames: this.anims.generateFrameNumbers("hacker_right", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });

  //Architect
  this.anims.create({
    key: "architect_idle",
    frames: [{ key: "architect", frame: 0 }],
    frameRate: 20,
  });
  this.anims.create({
    key: "architect_action",
    frames: this.anims.generateFrameNumbers("architect", {
      start: 0,
      end: 29,
    }),
    frameRate: 15,
    repeat: -1,
  });

  //Effects Animations
  this.anims.create({
    key: "flame",
    frames: this.anims.generateFrameNumbers("flame", {
      start: 0,
      end: 6,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "portal",
    frames: this.anims.generateFrameNumbers("portal", {
      start: 0,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });


  this.anims.create({
    key: "explosion",
    frames: this.anims.generateFrameNumbers("explosion", {
      start: 0,
      end: 64,
    }),
    frameRate: 50,
    repeat: -1,
  });


  this.anims.create({
    key: "bomb_sprite",
    frames: this.anims.generateFrameNumbers("bomb_sprite", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "bug_right",
    frames: this.anims.generateFrameNumbers("bug_right", {
      start: 0,
      end: 3,
    }),
    frameRate: 30,
    repeat: -1,
  });

  this.anims.create({
    key: "bug_left",
    frames: this.anims.generateFrameNumbers("bug_left", {
      start: 0,
      end: 3,
    }),
    frameRate: 30,
    repeat: -1,
  });

  this.anims.create({
    key: "brick_break",
    frames: this.anims.generateFrameNumbers("brick_break", {
      start: 0,
      end: 7,
    }),
    duration: 600,
  });

  //Enable Keyboard Inputs
  cursors = this.input.keyboard.createCursorKeys();

  //Bugs
  bugs = this.physics.add.group({
    key: "bug_right",
    //Will create 12 bugs total, 1 original and 12 children
    repeat: 11,
    //Placement of generated bugs
    setXY: { x: 12, y: -20, stepX: 70 },
  });

  bugs.children.iterate(function (child) {
    child.anims.play("bug_right", true);
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //Gravity can be overridden on a body from the value set in the config above
    child.setGravityY(400);
    child.disableBody(true);
  });

  //Feature
  this.anims.create({
    key: "feature",
    frames: [{ key: "feature", frame: 0 }],
    frameRate: 20,
  });

  //Bombs
  bombs = this.physics.add.group();

  //Code Blocks
  codeBlocks = this.physics.add.group();

  //Features
  features = this.physics.add.group();

  //FireWall PowerUp
  firewallPowerups = this.physics.add.group();

  //Architect Powerup
  architectPowerups = this.physics.add.group();

  //Architect Powerup
  antiGravityPowerups = this.physics.add.group();

  //Adds the collision between the objects and the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(hackers, platforms);
  this.physics.add.collider(hackers, platformBarriers);
  this.physics.add.collider(codeBlocks, codeBlockBarriers, bounceOffCodeBlock, null, this);
  rocketCollider = this.physics.add.collider(
    rocket,
    platformBarriers,
    rocketPreLaunch,
    null,
    this
  );
  this.physics.add.collider(bugs, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(firewallPowerups, platforms);
  this.physics.add.collider(architectPowerups, platforms);
  this.physics.add.collider(antiGravityPowerups, platforms);
  this.physics.add.collider(player, hackers);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
  this.physics.add.collider(player, features, hitFeature, null, this);
  this.physics.add.collider(bugs, offScreenBarriers, disableItem, null, this);
  this.physics.add.collider(features, offScreenBarriers, disableItem, null, this);
  this.physics.add.collider(architectPlatform, platformBarriers);
  this.physics.add.collider(architect, architectPlatform);
  this.physics.add.collider(architect, platformBarriers);
  this.physics.add.collider(bugs, bugs);
  this.physics.add.collider(player, codeBlocks, breakCodeBlock, null, this);

  //Overlaps Events
  this.physics.add.overlap(player, bugs, squashBugs, null, this);
  this.physics.add.overlap(player, firewallPowerups, enableFirewall, null, this);
  this.physics.add.overlap(player, architectPowerups, addArchitectPowerup, null, this);
  this.physics.add.overlap(player, antiGravityPowerups, addAntiGravity, null, this);

  //Round
  roundText = this.add.text(675, 16, "Sprint: 1", {
    fontSize: "20px",
    fill: "#FFFFFF",
  });
  roundText.visible = false;

  //Final Round Count
  finalRoundCount = this.add.text(560, 36, "Bugs Remaining: 12", {
    fontSize: "20px",
    fill: "#FFFFFF",
  });
  finalRoundCount.visible = false;

  //Start Round One Text
  startRoundOne = this.add.text(15, 615, [
    "Message: Go-Live Attempt Number: 17",
    "         Please resolve all issues reported by the client immediately.",
    "",
    "Info:    Squashing bugs ...",
  ]);
  startRoundOne.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    backgroundColor: "black",
  });
  startRoundOne.visible = false;

  //End Round One Text
  endRoundOne = this.add.text(15, 615, [
    "Message: Issues resolved.",
    "         Unfortunately, the client's internal dev team introduced some new ones.",
  ]);
  endRoundOne.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    backgroundColor: "black",
  });
  endRoundOne.visible = false;

  //End Round Two Text
  endRoundTwo = this.add.text(15, 615, [
    "Warning: Intruder Alert",
    "         Malfeasance detected in the repository",
    "         The firewall must be configured",
    "         Do not touch any code dropped by the intruders",
  ]);
  endRoundTwo.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    color: "red",
    backgroundColor: "yellow",
  });
  endRoundTwo.visible = false;

  //End Round Three Text
  endRoundThree = this.add.text(15, 615, [
    "Warning:   Merge Conflict Detected",
    "Message:   Move the code blocks to their appropriate locations to resolve the conflict"
  ]);
  endRoundThree.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    backgroundColor: "black",
  });
  endRoundThree.visible = false;

  //End Round Four Text
  endRoundFour = this.add.text(15, 615, [
    "Message: The FINAL final list of issues inbound from client",
    "Warning: Don't hold your breath",
  ]);
  endRoundFour.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    backgroundColor: "black",
  });
  endRoundFour.visible = false;

  //End Round Five Text
  endRoundFive = this.add.text(15, 615, [
    "Message: Issues Resolved, Site Secure, To-Do's completed",
    "         Project is ready for PROD",
    "         For the love of God, please launch the project",
    "         before the client asks for new features"
  ]);
  endRoundFive.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    backgroundColor: "black",
  });
  endRoundFive.visible = false;

  //Summon Architect Text
  summonArchitectText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project> -summon Architect"]);
  summonArchitectText.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    color: "yellow",
    backgroundColor: "black",
  });
  summonArchitectText.visible = false;

  //Summon Architect Text
  enableFirewallText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project> Press 'F' to enable firewall ..."]);
  enableFirewallText.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    color: "yellow",
    backgroundColor: "black",
  });
  enableFirewallText.visible = false;

  //Launch Text
  launchText = this.add.text(15, 615, ["C:\\Develop\\Endless-Client-Project> Press 'W' to launch the project ..."]);
  launchText.setStyle({
    fontSize: "14px",
    fontFamily: "Courier",
    align: "left",
    color: "yellow",
    backgroundColor: "black",
  });
  launchText.visible = false;

  //Timer Text
  intermissionTimerText = this.add.text(375, 175, [countDown]);
  intermissionTimerText.setStyle({
    fontSize: "64px",
    fontFamily: "Courier",
    align: "center",
  });
  intermissionTimerText.visible = false;

  //Game Timer Text
  gameTimerText = this.add.text(375, 16, [formatTime(gameTimer)]);
  gameTimerText.setStyle({
    fontSize: "20px",
    fontFamily: "Courier",
    align: "center",
  });
  gameTimerText.visible = false;
}