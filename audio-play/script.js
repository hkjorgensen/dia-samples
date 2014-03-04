var audio = null;

$(document).ready(function() {
  // Listen for user interaction
  $("#playButton").on("click", onPlayClick);
  $("#playRhythm").on("click", onPlayRhythm);

  // Set up audio
  // Take a look at /bower_components/kattegat-client/audio.js to see more
  audio = kattegatAudio.initialize();

  // Load a single sample
  kattegatAudio.load('cowbell', 'cowbell.wav', function(name) {
    console.log("'" + name + "' loaded");
  });

  // Load a bunch of samples
  kattegatAudio.loadSet({
    kick: 'kick.wav',
    snare: 'snare.wav',
    hihat: 'hihat.wav'
  }, function() {
    console.log("Loaded drum sounds");
  })

  // Note that for big samples it might take a moment to
  // load and you won't be able to play samples until they're done.
  // Therefore the callback functions (all we do in these demos is
  // console.log a message) are useful to be notified when the
  // files are fetched.
});

// Plays a sample
//  We use the 'play' function from audio.js
function onPlayClick() {
  // Start it immediately
  kattegatAudio.play('cowbell', 0)
  
  // Or, if we wanted to play 5 seconds in the future:
  //kattegatAudio.play(audio.currentTime + 5);
}

// Plays a sequence of audio
function onPlayRhythm() {
  // Start 100ms in the future
  var startAt = audio.currentTime + 0.100;

  var tempoBpm = 80; // Beats per minute
  var beatInterval = 60 / tempoBpm; // Convert to second interval of beats
  var eigthInterval = beatInterval / 2;
  var sixteenthInterval = beatInterval / 4;

  // Play two bars
  for (var bar=0;bar<2; bar++) {
    var t = startAt + (bar * 4 * beatInterval);

    // Play kick at beats 1, 2, 3 and 4
    kattegatAudio.play('kick', t + 0*beatInterval);
    kattegatAudio.play('kick', t + 1*beatInterval);
    kattegatAudio.play('kick', t + 2*beatInterval);
    kattegatAudio.play('kick', t + 3*beatInterval);

    // Play snare every 8th
    kattegatAudio.play('snare', t + 1*eigthInterval);
    kattegatAudio.play('snare', t + 3*eigthInterval);
    kattegatAudio.play('snare', t + 5*eigthInterval);
    kattegatAudio.play('snare', t + 7*eigthInterval);

    // Play hithat every 16th, skipping last
    for (var i=0;i<15;i++) {
      kattegatAudio.play('hihat', t + i*sixteenthInterval);
    }
  }
}

