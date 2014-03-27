// Initialise a few variables
var socket = null;

//When the browser is ready
$(document).ready(function() {
  // Connect realtime stuff up
  socket = io.connect('/');
  socket.on('say', onSay);

  //Attach eventlisteners to window
  $(window).on('devicemotion', onDeviceMotion);
});

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
  updateBoxPosition(motion);
}

function updateBoxPosition(motion) {
  var screenSize = $(window).size();
  var boxSize = $('aside').size();
  //Use the X & Y acc. to change the placement
  var left = $('aside').offset().left;
  var top = $('aside').offset().top;

  //Apply accelration
  left = left + motion.accelerationIncludingGravity.x;
  top = top + motion.accelerationIncludingGravity.y;

  //Test that the box does not leave the screen
  top = Math.max(top, 0);
  left = Math.max(left, 0);

  top = Math.min(top, (screenSize.height - boxSize.height));
  left = Math.min(left, (screenSize.width - boxSize.width));

  //Apply the new values
  $('aside').css({
    top: top,
    left: left
  });
}
