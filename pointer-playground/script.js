
$(document).ready(function() {
	//Prevent normal iOS/Android touch gestures

	$('body').on('touchmove', function(e) { e.preventDefault() });
	$('section').on("pointerdown pointerup pointermove pointerover pointerout pointerenter pointerleave", onEvent);
});

// Listen to all of the pointer events within the 'section' element
function onEvent(e) {
	// Print out some useful information to a DIV
  
	// e.originalEvent contains a lot of the useful data
  var orig = e.originalEvent;


  var data = '<div>' +
  					 '<div><strong>'+ e.type + '</strong></div>' +
  					 '<div>' + orig.pointerType + ' x: ' + Math.floor(orig.x) + " y: " + Math.floor(orig.y) + " button: " + orig.button + " id: " +  orig.pointerId + '</div>' +
  					 '</div>'
  $('aside').prepend(data);
}
