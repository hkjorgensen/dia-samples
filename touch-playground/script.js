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

/*
 *
 * Custom actions
 *
*/

//Create a reference to the element
var element = document.querySelector('section');

//What kind of events should be logged
var events = [
  'touch', 'release', 'hold', 'tap', 'doubletap',
  'drag', 'dragstart', 'dragend', 'dragleft', 'dragright', 'dragup', 'dragdown',
  'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown',
  'transformstart', 'transform', 'transformend',
  'rotate', 'rotateleft', 'rotateright',
  'pinch', 'pinchin', 'pinchout'
];

//Change the color of the element when it is touched
Hammer(element).on(events.join(' '), function(e) {
  var name = '<div>'+ e.type +'</div>';

  $('aside strong').after(name);
});
