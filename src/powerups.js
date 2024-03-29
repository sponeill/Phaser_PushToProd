// Architect
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
  
 function addArchitectPowerup(player, architectPowerup) {
    hasArchitect = true;
    architectPowerup.disableBody(true, true);
    numberOfArchitects++;
    architectIcon.setTexture('architectIcon');
}
  
function revealArchitect() {

    if (hasArchitect) {
      hasArchitect = false;
      summonArchitectText.visible = true;
      architectIcon.setTexture('architectIcon_grey');
      architectPlatform.setGravityY(-150);
      architect.setGravityY(-150);

      if(round != 3 && round != 4 && round != 5)
      {
        setTimeout(function () {
          architect.anims.play("architect_action", true);
        }, 1500);
  
        setTimeout(function () {
          console.log("Begin architect effect");
          architectEffect();
        }, 2500);
      } else {
        
        setTimeout(function () {
          busyArchitect.visible  = true;
        }, 1500);

        setTimeout(function () {
          busyArchitect.visible  = false;
          summonArchitectText.visible = false;
          architectPlatform.setGravityY(-500);
        }, 4500);
      }

    }
  }

function dismissArchitect() {
    summonArchitectText.visible = false;
    architectPlatform.setGravityY(-500);
    architect.anims.play("architect_action", false);
    setTimeout(function () {
        squashBugs();
      }, 1000);
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

function explodeBug(child) {
    child.anims.play("explosion", true);
    setTimeout(function () {
      child.disableBody(true, true);
      bugCount--;
    }, Phaser.Math.Between(250, 1250));
}
 
//Firewall
  function enableFirewall(player, powerup) {
    powerup.disableBody(true, true);

    fireWallCount++;

    if (fireWallCount === 1) {
       dropPowerUp();
       firewallIcon.setTexture('firewallIcon_half');
    } else if (fireWallCount === 2) {
      hasFirewall = true;
      enableFirewallText.visible = true;
      firewallIcon.setTexture('firewallIcon');
    }
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

// Anti-Gravity

function dropAntiGravityPowerup() {
    var powerUp = antiGravityPowerups.create(
      Phaser.Math.Between(0, 800),
      0,
      "antiGravityPowerup"
    );
    powerUp.setBounce(1);
    powerUp.setGravityY(-100);
    powerUp.setCollideWorldBounds(true);
    powerUp.setVelocity(Phaser.Math.Between(-300, 300), 20);

    setTimeout(function () {
      powerUp.disableBody(true, true);
    }, 7500);
}

function addAntiGravity(player, antiGravityPowerup) {
    hasAntiGravity = true;
    antiGravityPowerup.disableBody(true, true);
    numberOfAntiGravityPowerups++;
    sqlIcon.setTexture('jetpackIcon');
}
  
function useAntiGravity() {

    antiGravityEnabled = true;

    setTimeout(function() {
        hasAntiGravity = false;
        sqlIcon.setTexture('jetpackIcon_grey');
        antiGravityEnabled = false;
    }, 10000);
}
