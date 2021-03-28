function formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, "0");
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}
  
function incrementGameTimer() {
    if (gameTimerText.visible === true && !launched) {
      gameTimer += 1; // One second
      gameTimerText.setText(formatTime(gameTimer));
    }
  }

  function intermissionTimer(player, bug) {
    console.log("Intermission Timer Started");
    countDown = 11;

    //Gives a 40% chance of getting an Architect Powerup
    var dropArchitectPower = Math.random() >= 0.60;

    if (!hasArchitect && dropArchitectPower && numberOfArchitects <= 1) {
      dropArchitectPowerup();
    }

    //Gives a 33% chance of getting Anti Gravity Power
    var dropAntiGravity = Math.random() >= 0.66;

    if (!hasAntiGravity && dropAntiGravity && numberOfAntiGravityPowerups == 0) {
        dropAntiGravityPowerup();
    }
  }

  function decrementCountdown() {
    countDown -= 1; // One second
    intermissionTimerText.setText(countDown);

    if (countDown <= 3 && roundComplete) {
      intermissionTimerText.visible = true;
    }

    if (countDown <= 0) {
      intermissionTimerText.visible = false;
    }
  }