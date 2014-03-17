$(document).ready(function() {
  //Listen for a click on the button
  $('button').on('pointerdown', onPointerDown);
});

function onPointerDown() {
  //Setup a new message object
  var msg = new SpeechSynthesisUtterance();
  //Get all available voices
  var voices = speechSynthesis.getVoices();
  //Get the text from the input box
  var text = $('input').val();
  //Get the selected voice (based on index)
  var index = $('select').val();

  //Get the selected voice
  msg.voice = voices[index];
  //Set the text to speech out loud
  msg.text = text;

  //Say it!
  speechSynthesis.speak(msg);
}

/*
 * The following code is only used to build the dropdown
 * getVoices is still a bit buggy.
*/
var voices = speechSynthesis.getVoices();
setTimeout(buildDropdown, 1000);
function buildDropdown() {
  var voices = speechSynthesis.getVoices();
  voices.forEach(function(voice, index) {
    console.log(voice, index);
    var $option = $('<option value="'+ index +'">'+ voice.name +' (index: '+index+')</option>');
    if (voice.default) { $option.prop('default', true); }
    $('select').append($option);
  });
}
