var recognition = null;

// Valid voice commands and the corresponding function
var commands = {
  'lights on': onLightOn,
  'lights off': onLightOff,
  'show me electronic dance music': onRandom
};

$(document).ready(function() {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US'; //America!

  //Events for voice recognition
  $(recognition).on('start', onStart);
  $(recognition).on('end', onEnd);
  $(recognition).on('result', onResult);

  //When user clicks the "Listen" button
  $('#mic').on('pointerdown', onPointerDown);
});

//User clicks the "Listen" button: start the voice recognition.
function onPointerDown() {
  recognition.start();
}

//When we are ready to listen
function onStart() {
  console.log('Started listening');
  $('#mic').prop('disabled', true);
  $('aside').fadeIn();
}

//When the user stops talking
function onEnd() {
  console.log('Stopped listening');
  $('#mic').prop('disabled', false);
  $('aside').fadeOut();
}

//When we have a match from the voice-recognition engine
function onResult(e) {
  var results = e.originalEvent.results;

  //Loop through all the results
  $.each(results, function(index, result){
    //If the result is flagged as "isFinal" - use it!
    if (result.isFinal) {
      //Get the transcript
      var text = result[0].transcript;

      //If we know the command, color it green and execute the function
      if (commands[text]) {
        //Add text to the transcript box
        $('section').prepend('<div class="green">'+ text +'</div>');
        //Execute function
        commands[text].call();
      } else {
        //We don't know the command
        //Add text to the transcript box
        $('section').prepend('<div class="red">'+ text +'</div>');
      }
    }
  });
}

// Speech recognition commands from the "commands" variable
function onLightOn() {
  $('.light').show(); //Show the light image
}

function onLightOff() {
  $('.light').hide(); //Hide the light image
}

function onRandom() {
  //Start a video from youtube with the Neoncat
  $('body').append('<iframe width="420" height="315" src="//www.youtube.com/embed/QH2-TGUlwu4?autoplay=1" frameborder="0" allowfullscreen></iframe>');
}

