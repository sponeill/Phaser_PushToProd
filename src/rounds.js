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
    child.anims.play("bug", true);
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
        child.anims.play("bug", true);
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
        child.anims.play("bug", true);
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

  var coordinates = [
    [825, 115],
    [825, 290],
    [825, 465]
  ];

  var item = coordinates[Phaser.Math.Between(0, 2)];

  var bug = bugs.create(item[0], item[1], "bug");
  bug.anims.play("bug", true);
  bug.enableBody(true, item[0], item[1], true, true);
  bug.setBounce(1);
  bug.setCollideWorldBounds(false);
  bug.setVelocityX(Phaser.Math.Between(-450, -300));
  bug.setGravityY(-300);

  lastBugSpawn = gameTimer;
};