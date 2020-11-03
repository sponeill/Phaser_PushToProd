function roundOne() {
  consoleText.visible = false;
  startRoundOne.visible = true;
  gameNotStarted = false;
  bugCount = 12;
  round = 1;
  roundText.setText("Round: " + round);
  gameTimerText.visible = true;
  roundText.visible = true;

  bugs.children.iterate(function (child) {
    randomLeftRightBug(child);
    child.enableBody(true, child.x, 0, true, true);
    child.setGravityY(0);
  });
}

function roundTwo(player, bug) {
  console.log("Start Round 2");
  startRoundOne.visible = false;;

  intermissionTimer();

  gameTimerText.visible = false;
  roundText.visible = false;

  endRoundOne.visible = true;

  beginNext();

  function beginNext() {
    setTimeout(function () {
      endRoundOne.visible = false;
      consoleDefaultText.visible = true;
      bugCount = 12;
      round = 2;
      roundText.setText("Round: " + round);
      gameTimerText.visible = true;
      roundText.visible = true;

      bugs.children.iterate(function (child) {
        randomLeftRightBug(child);
        child.enableBody(true, child.x, 0, true, true);
        child.setBounceY(Phaser.Math.FloatBetween(0.9, 1));
        child.setGravityY(0);
      });
    }, 10500);
  }
}

function roundThree(player, bug) {
  console.log("Start Round 3");

  intermissionTimer();

  gameTimerText.visible = false;
  roundText.visible = false;

  endRoundTwo.visible = true;

  beginNext();

  function beginNext() {
    setTimeout(function () {
      endRoundTwo.visible = false;
      consoleDefaultText.visible = true;
      bugCount = 12;
      round = 3;
      roundText.setText("Round: " + round);

      gameTimerText.visible = true;
      roundText.visible = true;

      spawnHacker();
    }, 10500);
  }
}

function roundFour(player, bug) {
  console.log("Start Round 4");

  intermissionTimer();

  gameTimerText.visible = false;
  roundText.visible = false;

  endRoundThree.visible = true;

  beginNext();

  function beginNext() {
    setTimeout(function () {
      endRoundThree.visible = false;
      consoleDefaultText.visible = true;
      bugCount = 12;
      round = 4;
      roundText.setText("Round: " + round);

      isMergeConflict = true;
      gameTimerText.visible = true;
      roundText.visible = true;

      bugs.children.iterate(function (child) {
        randomLeftRightBug(child);
        child.enableBody(true, child.x, 0, true, true);
        child.setBounce(1);
        child.setCollideWorldBounds(true);
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
        child.setGravityY(0);
      });
    }, 10500);
  }
}

function roundFive(player, bug) {
  console.log("Start Round 5");
  isMergeConflict = false;

  conflicts.children.iterate(function (child) {
    child.disableBody(true, true);
    child.visible = false;
  });

  intermissionTimer();

  gameTimerText.visible = false;
  roundText.visible = false;

  endRoundFour.visible = true;

  beginNext();

  function beginNext() {
    setTimeout(function () {
      endRoundFour.visible = false;
      consoleDefaultText.visible = true;
      bugCount = 12;
      round = 5;
      roundText.setText("Round: " + round);
      finalRoundCount.visible = true;

      gameTimerText.visible = true;
      roundText.visible = true;
    }, 10500);
  }
}

//TODO: REFACTOR
function spawnBug() {

  var rightCoordinates = [
    [825, 115],
    [825, 290],
    [825, 465]
  ];

  var leftCoordinates = [
    [25, 90],
    [25, 260],
    [25, 435]
  ];

  var featureCoordinates = [
    [25, 145],
    [25, 300],
    [25, 480]
  ];

  var result = Math.random();

  if(result >= .21 && result <= .60) {

    var item = rightCoordinates[Phaser.Math.Between(0, 2)];

    var bug = bugs.create(item[0], item[1], "bug_left");
    bug.anims.play("bug_left", true);
    bug.enableBody(true, item[0], item[1], true, true);
    bug.setBounce(1);
    bug.setCollideWorldBounds(false);
    bug.setVelocityX(Phaser.Math.Between(-450, -300));
    bug.setGravityY(-300);
  
    lastBugSpawn = gameTimer;
  } else if(result >= .61 && result <= 1) {

    var item = leftCoordinates[Phaser.Math.Between(0, 2)];

    var bug = bugs.create(item[0], item[1], "bug_right");
    bug.anims.play("bug_right", true);
    bug.enableBody(true, item[0], item[1], true, true);
    bug.setBounce(1);
    bug.setCollideWorldBounds(false);
    bug.setVelocityX(Phaser.Math.Between(450, 300));
    bug.setGravityY(-300);
  
    lastBugSpawn = gameTimer;
  }
   else if(result <= .20) {
    var item = featureCoordinates[Phaser.Math.Between(0, 2)];

    var feature = features.create(item[0], item[1], "feature");
    feature.anims.play("feature", true);
    feature.enableBody(true, item[0], item[1], true, true);
    feature.setBounce(1);
    feature.setCollideWorldBounds(false);
    feature.setVelocityX(Phaser.Math.Between(450, 300));
    feature.setGravityY(-300);

    lastBugSpawn = gameTimer;
   }
};

function randomLeftRightBug(bug) {
  var result = Math.random() >= 0.50;

  if(result) {
    bug.anims.play("bug_right", true);
  } else {
    bug.anims.play("bug_left", true);
  }
}

function spawnCodeBlock() {
   var codeBlock = codeBlocks.create(350, 250, "code_block");
      codeBlock.setCollideWorldBounds(true);
}

function fixMergeConflict() {
  conflicts.children.iterate(function (child) {
    child.angle = child.angle - 10;
  });
}