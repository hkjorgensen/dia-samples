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

//Create reusable reference to the element
var element = document.querySelector('body');

//Change color based on velocity
Hammer(element).on('swipe', function(e) {
  var velocityX = e.gesture.velocityX;
  var max = 4; // The highest allowed velocity value
  var newRedColor = 0;
  var percentage = velocityX / max;

  //Make sure we don't exceed 1
  percentage = Math.min(percentage, 1);

  //Convert the velocity on the rgb scale. 255 is maxium and pure red.
  newRedColor = 255 * percentage;
  //Round to integer
  newRedColor = Math.round(newRedColor);

  //Change the color!
  $(element).css('background', 'rgb('+ newRedColor +',0,0)');
});
