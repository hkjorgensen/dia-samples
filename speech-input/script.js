var recognition = null;
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

  $(recognition).on('start', onStart);
  $(recognition).on('end', onEnd);
  $(recognition).on('result', onResult);

  $('#mic').on('pointerdown', onPointerDown);
});


function onPointerDown() {
  recognition.start();
}

function onStart() {
  console.log('Started listening');
  $('#mic').prop('disabled', true);
  $('aside').fadeIn();
}

function onEnd() {
  console.log('Stopped listening');
  $('#mic').prop('disabled', false);
  $('aside').fadeOut();
}

function onResult(e) {
  var results = e.originalEvent.results;

  $.each(results, function(index, result){
    if (result.isFinal) {
      //Check if we know the command
      var text = result[0].transcript;

      if (commands[text]) {
        $('section').prepend('<div class="green">'+ text +'</div>');
        commands[text].call();
      } else {
        $('section').prepend('<div class="red">'+ text +'</div>');
      }
    }
  });
}

// Speech commands
function onLightOn() {
  $('.light').show();
}

function onLightOff() {
  $('.light').hide();
}

function onRandom() {
  $('body').append('<iframe width="420" height="315" src="//www.youtube.com/embed/QH2-TGUlwu4?autoplay=1" frameborder="0" allowfullscreen></iframe>');
}

