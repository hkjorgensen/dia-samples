/*
 *
 * Setup
 *
*/
$(document).ready(function() {
  //Prevent normal iOS/Android touch gestures
  $('body').on('touchmove', function(e) { 
    e.preventDefault()
  });

  // Important! Initialise Hammer
  $('body').hammer();

  // Listen for swipe event
  $('body').on('swipe', onSwipe);
});


//Change color based on velocity
function onSwipe(e) {
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
  $('body').css({
    'background-color': 'rgb('+ newRedColor +',0,0)'
  });
}
