// Initialise a few variables
var socket = null;
var ahigh = null;
var alow = null;
var aghigh = null;
var aglow = null;
var rhigh = null;
var rlow = null;

//When the browser is ready
$(document).ready(function() {
  //Reset high/low values immediately
  resetValues();

  // Connect realtime stuff up
  socket = io.connect('/');
  socket.on('say', onSay);

  //Attach eventlisteners to window
  $(window).on('devicemotion', onDeviceMotion);

  //Attach reset button function
  $('#reset').on('pointerdown', resetValues);
});

function resetValues() {
  ahigh = {x: 0, y: 0, z: 0};
  alow = {x: 9999, y: 9999, z: 9999};

  aghigh = {x: 0, y: 0, z: 0};
  aglow = {x: 9999, y: 9999, z: 9999};

  rhigh = {alpha: 0, beta: 0, gamma: 0};
  rlow = {alpha: 9999, beta: 9999, gamma: 9999};
}

//Collect data and send it to the server
function onDeviceMotion(e) {
  var motion = e.originalEvent;

  // console.log(motion);
  var acceleration = {
    x: motion.acceleration.x,
    y: motion.acceleration.y,
    z: motion.acceleration.z
  };
  var accelerationIncludingGravity = {
    x: motion.accelerationIncludingGravity.x,
    y: motion.accelerationIncludingGravity.y,
    z: motion.accelerationIncludingGravity.z
  };
  var rotationRate = {
    alpha: motion.rotationRate.alpha,
    beta: motion.rotationRate.beta,
    gamma: motion.rotationRate.gamma
  };

  socket.emit('say', {
    acceleration: acceleration,
    accelerationIncludingGravity: accelerationIncludingGravity,
    rotationRate: rotationRate
  });
}

//Do something with the data from a third device (Phone, tablet etc.)
function onSay(motion) {
  if (motion.acceleration) {
    accelerationHandler(motion.acceleration);
  }

  if (motion.accelerationIncludingGravity) {
    accelerationIncludingGravityHandler(motion.accelerationIncludingGravity);
  }

  if (motion.rotationRate) {
    rotationRateHandler(motion.rotationRate);
  }
}

//Handle acceleration
function accelerationHandler(acceleration) {
  $.each(acceleration, function(key, value) {
    if (acceleration[key] > ahigh[key]) {
      ahigh[key] = Math.round(acceleration[key]);
    }

    if (acceleration[key] < alow[key]) {
      alow[key] = Math.round(acceleration[key]);
    }
  });

  //Update HTML
  $('#ax').html(acceleration.x + ' - high/low: ' + ahigh.x + ' / ' + alow.x);
  $('#ay').html(acceleration.y + ' - high/low: ' + ahigh.y + ' / ' + alow.y);
  $('#az').html(acceleration.z + ' - high/low: ' + ahigh.z + ' / ' + alow.z);
}

//Handle accelerationIncludingGravity
function accelerationIncludingGravityHandler(accelerationIncludingGravity) {
  $.each(accelerationIncludingGravity, function(key, value) {
    if (accelerationIncludingGravity[key] > aghigh[key]) {
      aghigh[key] = Math.round(accelerationIncludingGravity[key]);
    }

    if (accelerationIncludingGravity[key] < aglow[key]) {
      aglow[key] = Math.round(accelerationIncludingGravity[key]);
    }
  });

  //Update HTML
  $('#agx').html(accelerationIncludingGravity.x + ' - high/low: ' + aghigh.x + ' / ' + aglow.x);
  $('#agy').html(accelerationIncludingGravity.y + ' - high/low: ' + aghigh.y + ' / ' + aglow.y);
  $('#agz').html(accelerationIncludingGravity.z + ' - high/low: ' + aghigh.z + ' / ' + aglow.z);
}

//Handle rotationRate
function rotationRateHandler(rotationRate) {
  $.each(rotationRate, function(key, value) {
    if (rotationRate[key] > rhigh[key]) {
      rhigh[key] = Math.round(rotationRate[key]);
    }

    if (rotationRate[key] < rlow[key]) {
      rlow[key] = Math.round(rotationRate[key]);
    }
  });

  //Update HTML
  $('#rra').html(rotationRate.alpha + ' - high/low: ' + rhigh.alpha + ' / ' + rlow.alpha);
  $('#rrb').html(rotationRate.beta + ' - high/low: ' + rhigh.beta + ' / ' + rlow.beta);
  $('#rrg').html(rotationRate.gamma + ' - high/low: ' + rhigh.gamma + ' / ' + rlow.gamma);
}
