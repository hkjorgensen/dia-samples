// Initialise a few variables
var socket = null;
var audio = null;
var gain = null;
var oscillator = null;
var volume = null;

//When the browser is ready
$(document).ready(function() {
  // Connect realtime stuff up
  socket = io.connect('/');
  socket.on('say', onSay);

  //Setup sound modules
  audio = kattegatAudio.initialize();
  oscillator = audio.createOscillator();
  gain = audio.createGain();

  //The Gain connects to the destination (speakers)
  gain.connect(audio.destination);

  //Set the volume to zero
  volume = 0;
  gain.gain.value = volume;

  //Setup the frequency
  oscillator.type = oscillator.TRIANGLE;

  //The oscillator connects to the Gain
  oscillator.connect(gain);

  //Start the oscillator immediatly
  oscillator.start(0);

  //Trigger is mobile show overlay
  if ( isMobile.any() ) {
    $('p').hide();
    $('#overlay').show();
  } else {
    //Attach eventlisteners to window
    $(window).on('devicemotion', onDeviceMotion);
  }
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
  updateSound(motion);
}

function updateSound(motion) {
  var z = motion.accelerationIncludingGravity.z;

  //Make it an integer: 1.111 = 1
  z = Math.round(z);

  // make z less strong 1 = 0.002
  z = z / 500;

  //Apply data to the current volume
  volume = volume + z;

  //Keep sound with boundaries 1/0 (max/min)
  volume = Math.max(0, volume);
  volume = Math.min(1, volume);

  //Apply new values
  gain.gain.value = volume;
  $('#volume').html(Math.round( volume*100 ));
}
