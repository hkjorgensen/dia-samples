var isPointerPressed = false;
var audio = null;
var oscillator = null;
var gain = null;
var interval = null;

$(document).ready(function() {
  //Listen once for a pointerdown event and setup the sound
  //This is important for working with iOS
  $('body').one('pointerdown', setupSound);

  //Listen for pointerevents to update sound and visuals
  $('body').on('pointerdown', onPointerDown);
  $('body').on('pointerup', onPointerUp);
  $('body').on('pointermove', onPointerMove);
});

function setupSound() {
  audio = kattegatAudio.initialize();
  oscillator = audio.createOscillator();
  gain = audio.createGain();

  //The Gain connects to the destination (speakers)
  gain.connect(audio.destination);

  //Set the volume to zero
  gain.gain.value = 0;

  //Setup the frequency
  oscillator.type = oscillator.SINE;
  oscillator.frequency.value = 280;

  //The oscillator connects to the Gain
  oscillator.connect(gain);

  //Start the oscillator immediatly
  oscillator.start(0);
}

function onPointerDown(e) {
  isPointerPressed = true;

  //Trigger a fake move so the box moves instantly
  onPointerMove(e);
}

function onPointerUp() {
  isPointerPressed = false;
}

function onPointerMove(e) {
  var pointerTop = e.originalEvent.clientY;
  var pointerLeft = e.originalEvent.clientX;
  var boxsize = $('aside').size();
  var bodysize = $('body').size();

  //If the point is pressed continue
  if (isPointerPressed) {
    var centerTop = bodysize.height/2;
    var centerLeft = bodysize.width/2;

    //Move the box
    $('aside').css({
      top: pointerTop - boxsize.height/2,
      left: pointerLeft - boxsize.width/2
    });

    // How far from center (linear algebra)
    // http://www.purplemath.com/modules/distform.htm
    var top = pointerTop - centerTop;
    var left = pointerLeft - centerLeft;
    // Square root: http://www.w3schools.com/jsref/jsref_sqrt.asp
    var delta = Math.sqrt( (top * top) + (left * left) );

    // Find the max distance - same formular.
    // (0, 0) is to the top left corner of the screen
    var topMax = 0 - centerTop;
    var leftMax = 0 - centerLeft;
    var deltaMax = Math.sqrt( (topMax * topMax) + (leftMax * leftMax) );

    //Get the delta value
    var percentage = delta/deltaMax;

    //Start the tremolo effect
    var absolute = percentage * 1;
    var stopAfterSeconds = absolute;
    var loopEveryMs = absolute * 2000; //Must be the double of stopAfterSeconds and in ms

    //Stop the running loop
    clearInterval(interval);
    gain.gain.cancelScheduledValues(audio.currentTime);

    function loop() {
      //Set volume to 1 immediately
      gain.gain.setValueAtTime(1, audio.currentTime);
      //Set volume to 0 after "stopAfterSeconds"
      gain.gain.setValueAtTime(0, audio.currentTime + stopAfterSeconds);
    }

    // Start the loop
    interval = setInterval(loop, loopEveryMs);
  }
}
