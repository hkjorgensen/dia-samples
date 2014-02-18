
$(document).ready(function() {
	//Prevent normal iOS/Android touch gestures
	$('body').on('touchmove', function(e) { e.preventDefault() });

  // Initialise Hammer (important!)
  $('body').hammer({prevent_default:true});

	//Enable extra debug on desktop browsers
	Hammer.plugins.showTouches();
	Hammer.plugins.fakeMultitouch();

	//What kind of events should be logged
	// 'events.join' later on 
	var events = [
	  'touch', 'release', 'hold', 'tap', 'doubletap',
	  'drag', 'dragstart', 'dragend', 'dragleft', 'dragright', 'dragup', 'dragdown',
	  'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown',
	  'transformstart', 'transform', 'transformend',
	  'rotate', 'rotateleft', 'rotateright',
	  'pinch', 'pinchin', 'pinchout'
	];
	
	// This converts the array above to one long string with each name separated by a space
	// eg: "touch release hold tap ..."
	var eventNames = events.join(' ');
	$('section').on(eventNames, onEvent);
});


function onEvent(e) {
	// e.gesture contains a lot of the useful data
  var g = e.gesture;
  var data = '<div>' +
  					 '<div><strong>'+ e.type + '</strong></div>' +
  					 '<div>angle: ' + g.angle + '  direction: ' + g.direction + '</div>' +
  					 '<div>velocity: ' + g.velocityX + ', ' + g.velocityY + '</div>' +

  					 '</div>'
  $('aside').prepend(data);
}
