var audio = null;
var oscillator = null;
var gain = null;
var isPointerActive = false;
// Notes
var lowNote = 261.63; // C4
var highNote = 493.88; // B4

$(document).ready(function() {
  //Listen once for a pointerdown event and setup the sound
  //This is important for working with iOS
  $('section').one('pointerdown', setupSound);

  //Listen for pointerevents to update sound and visuals
  $('section').on('pointerdown', onPointerDown);
  $('section').on('pointerup pointerleave', onPointerUp);
  $('section').on('pointermove', onPointerMove);
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
  oscillator.type = oscillator.TRIANGLE;

  //The oscillator connects to the Gain
  oscillator.connect(gain);

  //Start the oscillator immediatly
  oscillator.start(0);
}

function onPointerDown(e) {
  isPointerActive = true;

  //Add visual class
  $('section').addClass('crosshair');

  //Update the pointer to provide instant feedback
  onPointerMove(e)
}

function onPointerUp() {
  isPointerActive = false;

  //Add visual class
  $('section').removeClass('crosshair');

  //Turn volume down to zero
  gain.gain.value = 0;
}

function onPointerMove(e) {
  if (!isPointerActive) { return; }

  var org = e.originalEvent;
  var x = org.offsetX;
  var y = org.offsetY;
  var noteValue = calculateNote(x);
  var volumeValue = calculateVolume(y);

  oscillator.frequency.value = noteValue;
  gain.gain.value = volumeValue;

  $('#frequency').text( Math.floor(noteValue) + ' Hz' );
  $('#volume').text(  Math.floor(volumeValue * 100) + '%' );
}

// Calculate the note
function calculateNote(posX) {
  var noteDifference = highNote - lowNote;
  var noteOffset = (noteDifference / $('section').width()) * posX;
  return lowNote + noteOffset;
}

// Calculate the volume
function calculateVolume(posY) {
  var volumeLevel = 1 - (((100 / $('section').height()) * posY) / 100);
  return volumeLevel;
}
