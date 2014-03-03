
// -----------------
// UTILITY FUNCTIONS
// -----------------

// Initialises audio engine
function initializeAudio()  {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new AudioContext();
    window.sounds = {};
    return audioContext;
  } catch (e) {
    return null;
  }
}


/*
 Loads a set of sounds. Eg:
 var sounds = { 
   snare: 'snare.wav',
   kick: 'kick.wav',
   voice: 'vox.wav'
 }
 loadSounds(sounds, function(sounds) {
  console.log("Loaded sounds!");
 })
*/
function loadSounds(map, complete) {
  var names = _.keys(map);
  loadSoundsImpl(names, map, complete);
}

function loadSoundsImpl(names, map, complete) {
  // Remove item from array
  var name = names.pop();

  // Load sound
  loadSound(name, map[name], function() {
    if (names.length == 0) {
      // No more sounds to load
      complete(map);
    } else {
      // More sounds to load
      loadSoundsImpl(names, map, complete);
    }
  })
}

// Plays a sound previously loaded with loadSound
//  Note that 'time' parameter is to when to schedule playback.
//  0 is to start immediately, while 'window.audioContext.currentTime + 1' would be one second in future
function playSound(name, time) {
  if (_.isUndefined(time)) time = 0;
  if (_.isUndefined(window.sounds[name])) throw new Error(name + " has not been loaded");
  var source = getSource(name);
  source.connect(window.audioContext.destination);
  source.start(time);
}

// Returns the data for a previously loaded sound
function getSound(name) {
  if (_.isUndefined(window.sounds[name])) throw new Error(name + " has not been loaded");
  return window.sounds[name];
}

// Creates (or reuses) a buffer source for a previously loaded sound
function getSource(name) {
  if (_.isUndefined(window.sounds[name])) throw new Error(name + " has not been loaded");
  var source = window.audioContext.createBufferSource();
  source.buffer = window.sounds[name];
  return source;
}

/*
 Loads a sound and associates a name with it. Eg:
 loadSound('snare', 'snare.wav', function(name) { 
    console.log(name + " loaded!")
  });
*/
function loadSound(name, url, complete) {
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.responseType = 'arraybuffer';

  req.onload = function() {
    window.audioContext.decodeAudioData(req.response, function(data) {
      // Keep track of each sound we load
      window.sounds[name] =  data;
      if (!_.isUndefined(complete)) complete(name);
    })
  }
  req.send();
} 
