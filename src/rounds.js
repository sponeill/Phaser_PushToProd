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

      gameTimerText.visible = true;
      roundText.visible = true;
    }, 10500);
  }
}

function spawnBug() {

  var rightCoordinates = [
    [825, 115],
    [825, 290],
    [825, 465]
  ];

  var leftCoordinates = [
    [25, 105],
    [25, 280],
    [25, 455]
  ];

  var result = Math.random() >= 0.50;

  if(result) {

    var item = rightCoordinates[Phaser.Math.Between(0, 2)];

    var bug = bugs.create(item[0], item[1], "bug_left");
    bug.anims.play("bug_left", true);
    bug.enableBody(true, item[0], item[1], true, true);
    bug.setBounce(1);
    bug.setCollideWorldBounds(false);
    bug.setVelocityX(Phaser.Math.Between(-450, -300));
    bug.setGravityY(-300);
  
    lastBugSpawn = gameTimer;
  } else {

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
};


function randomLeftRightBug(bug) {
  var result = Math.random() >= 0.50;

  if(result) {
    bug.anims.play("bug_right", true);
  } else {
    bug.anims.play("bug_left", true);
  }
}