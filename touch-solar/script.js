/*
 *
 * Setup
 *
*/

//Prevent normal iOS/Android touch gestures
$('body').on('touchmove', function(e) { e.preventDefault() });

//Enable extra debug on desktop browsers
Hammer.plugins.showTouches();
Hammer.plugins.fakeMultitouch();

//Create a reference to the element
var element = document.querySelector('body');

/*
 *
 * Custom actions
 *
*/

/*
 * Create a new star
*/
Hammer(element).on('tap', function(e) {
  //Get the coordinates
  var top = e.gesture.center.pageY;
  var left = e.gesture.center.pageX;

  //Create a star with the correct position
  var star = $('<aside></aside>')
    .css('top', top)
    .css('left', left);

  //Insert the star
  $(element).append(star);
});

/*
 * Create a new planet
*/
var planet = undefined;
Hammer(element).on('pinch', function(e){
  //Get the coordinates
  var size = '10';
  var top = e.gesture.center.pageY;
  var left = e.gesture.center.pageX;
  var scale = e.gesture.scale;

  if (planet) {
    //adjust the size
    scale = Math.pow(scale, 2);
    size = size * scale;

    planet
      .css('width', size)
      .css('height', size)
      .css('margin-left', -1 * (size/2)) //Center position
      .css('margin-top', -1 * (size/2)); //Center position

  } else {
    //Create the planet
    planet = $('<figure></figure>')
      .css('top', top)
      .css('left', left)
      .css('width', size)
      .css('height', size);

    $(element).append(planet);
  }
});

/* Adjust the planet color based on rotation */
Hammer(element).on('rotate', function(e) {
  var rotation = e.gesture.rotation;
  var hue = rotation + 360;

  //Make sure hue does not exceed 360 - the highest possible value
  hue = Math.min(hue, 360);

  if (planet) {
    //HSL values: http://hslpicker.com/
    planet.css('background', 'hsl('+hue+',100%,20%)');
  }
});

/* Cleanup references */
Hammer(element).on('release', function() {
  //cleanup
  planet = undefined;
});

/*
 * Delete a planet
*/
Hammer(element).on('hold', function(e) {
  var target = e.target;
  if (target.tagName === 'FIGURE') {
    //Remove the planet
    $(target).remove();
  }
});
