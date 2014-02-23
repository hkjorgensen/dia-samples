//Create a reference to the element
var timer;

$(document).ready(function() {
	// Prevent normal iOS/Android touch gestures
	$('body').on('touchmove', function(e) { e.preventDefault() });
	$('section').on('pointerdown', onPointerDown);
	$('section').on('pointerup', onPointerUp);
});

function changeToRed() {
  $('section').css({
  	'background-color': 'red'
  });
}

//Change the color of the element when it is touched
function onPointerDown(e) {
	// Prevent default browser action
	e.stopPropagation();

  $('section').css({
  	'background-color': 'orange'
  });

  //Lets emulate a longpres (> 1second)
  timer = setTimeout(changeToRed, 1000);
}

//Change the color of the element when the touch ends
function onPointerUp() {
  $('section').css({
  	'background-color': 'blue'
  });
  clearTimeout(timer);
}

