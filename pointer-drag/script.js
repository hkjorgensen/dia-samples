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

$('body').on('pointermove', function(e) {
  var top = e.originalEvent.clientY;
  var left = e.originalEvent.clientX;
  var coordinates = '<div>X: '+ left +'</div><div>Y: '+ top +'</div>';

  $('section')
    .css('left', left)
    .css('top', top)
    .html(coordinates);
});
