/*
 *
 * Setup
 *
*/

//Prevent normal iOS/Android touch gestures
$('body').on('touchmove', function(e) { e.preventDefault() });

/*
 *
 * Custom actions
 *
*/

//Create a reference to the element
var timer;

function changeToRed() {
  $('section').css('background', 'red');
}

//Change the color of the element when it is touched
$('section').on('pointerdown', function() {
  $('section').css('background', 'orange');

  //Lets emulate a longpres (> 1second)
  timer = setTimeout(changeToRed, 1000);
});

//Change the color of the element when the touch ends
$('section').on('pointerup', function() {
  $('section').css('background', 'blue');
  clearTimeout(timer);
});

