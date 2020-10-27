function update() {
  if (cursors.left.isDown) {
    facingRight = false;
    player.setVelocityX(-160);

    if (player.body.touching.down) {
      player.anims.play("left", true);
    } else {
      player.anims.play("jump_left", true);
    }
  } else if (cursors.right.isDown) {
    facingRight = true;
    player.setVelocityX(160);

    if (player.body.touching.down) {
      player.anims.play("right", true);
    } else {
      player.anims.play("jump_right", true);
    }
  } else {
    if (facingRight) {
      player.anims.play("turn_right");
    } else {
      player.anims.play("turn_left");
    }
    player.setVelocityX(0);
  }

  //Jump
  //Check to see if Up Key is depressed AND if player body is touching solid ground
  if (cursors.up.isDown) {
    if (facingRight) {
      player.anims.play("jump_right", true);
    } else {
      player.anims.play("jump_left", true);
    }

    if (player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }

  //Hacker Movements
  hackers.children.iterate(function (child) {
    if (child.body.touching.right) {
      console.log("hacker touch right");
      child.setVelocityX(-80);
      child.anims.play("hacker_left", true);
    }

    if (child.body.touching.left) {
      console.log("hacker touch left");
      child.setVelocityX(80);
      child.anims.play("hacker_right", true);
    }
  });

  //Drop Hacker Bombs
  if (hackers.countActive(true) > 0) {
    var GetAll = Phaser.Utils.Array.GetAll;
    var GetRandom = Phaser.Utils.Array.GetRandom;

    var hacker = GetRandom(GetAll(hackers.getChildren(), "active", true));

    var x = hacker.x;
    var y = hacker.y;

    if (
      gameTimer - lastBombRelease > 5 &&
      bombCount <= 4 &&
      allowBombs &&
      !firewallUp
    ) {
      var bomb = bombs.create(x, y, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 80);
      lastBombRelease = gameTimer;
      bombCount++;
    }
  }

  //Round 4 Merge Conflict Events
  if (isMergeConflict && !mergeConflictShown) {
    mergeConflictShown = true;

    conflicts.children.iterate(function (child) {
      child.enableBody(true);
      child.visible = true;
      child.angle = child.angle + Phaser.Math.Between(15, 45);
    });
  }

  //Round Five Enemies
  if(round === 5 && bugCount > 0 && gameTimer - lastBugSpawn >= 2) {
    spawnBug();
  }
}