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

var events = [
  'pointerdown',
  'pointerup',
  'pointermove',
  'pointerover',
  'pointerout',
  'pointerenter',
  'pointerleave'
];

$('section').on(events.join(' '), function(e) {
  var name = '<div>'+e.type+'</div>';
  $('aside').prepend(name);
});
