// Initialise a few variables
var ourColour = "green";
var socket = null;
var timeout = null;

$(document).ready(function() {
	// Prevent normal iOS/Android touch gestures
	$('body').on('touchmove', function(e) { e.preventDefault() });

	// Listen for pointermove
	$('body').on('pointermove', onPointerMove);

	// Assign a random colour for ourselves
	ourColour = getRandomColour();

	// Connect realtime stuff up
	socket = io.connect("http://" + window.location.host);
	socket.on("say", onSay);

	$('body').css({
		"background-color": ourColour
	})

	timeout = setTimeout(ageCursors, 1000);
});


function getRandomColour() {
	// Construct random colour from r, g + b
	// components.

	// It will return a string like:
	// rgb(100,35,200)
	
	// We'll use lodash's random function.
	//	Read more: http://lodash.com/docs#random

	return "rgb(" + 
			_.random(0,255) + ", "+
			_.random(0,255) + ", " +
			_.random(0,255) + ")";
}

function onPointerMove(e) {
	// Use the 'say' command to broadcast
	// a few interesting fields from the event to all
	// other pages
	var orig = e.originalEvent;

	var windowWidth = $(window).innerWidth();
	var windowHeight = $(window).innerHeight();

 	var data = {
		name: e.type,
		type: orig.pointerType,
		x: orig.x / windowWidth, // Use a relative x,y
		y: orig.y / windowHeight,// depending on screen size
		id: orig.pointerId,
		colour: ourColour
	}
	socket.emit("say", data);

	// We want to process the data the same as if
	// it was sent by another page. The server doesn't
	// send our own data back to us, so we have to trigger
	// the onSay function manually

	data._clientId = "0"; // Normally received data has a _clientId, so we need to fake it
	onSay(data);
}

function getOrCreateCursor(e) {
	// Cursors have an id of something like:
	//	cursor-1-TiF7PmuoDrlXPRWYsuyx
	var cursorId = "cursor-" +e.id+"-"+ e._clientId;
	var cursorSelector = "#" + cursorId;
	// Check to see if an element exists:
	if ($(cursorSelector).length == 0) {
		// Ok, not found - add it!
		var html = '<div class="cursor" id="' +  cursorId + '">'+ e.id + '</div>';
		$(html).appendTo('body');
		$(cursorSelector).css("background-color", e.colour);
	} 

	return $(cursorSelector);

}

// Called when ever we receive a message from
// another page
function onSay(e) {
	var windowWidth = $(window).innerWidth();
	var windowHeight = $(window).innerHeight();

	if (e.name == "pointermove") {
		// Match relative positions to our
		// window size. We -50 because the
		// width of the cursor circle is 100.
		// This centers it.
		var x = (e.x * windowWidth) - 50;
		var y = (e.y * windowHeight) - 50; 
		var element = getOrCreateCursor(e);
		$(element).css({
			left: x,
			top: y,
			opacity: 1.0,
			scale: 1.0
		})
	}
	// else if: handle other kinds of events??
}

// 'Age' cursors to remove them from the screen
function ageCursors() {
	// The jQuery .each function loops through all
	// elements that match the selector, and let us
	// run some logic for each thing independently
	$(".cursor").each(function(index, cursor) {
		var newOpacity = $(cursor).css("opacity") - 0.4;
		var newScale = $(cursor).css("scale") + 0.8;

		if (newOpacity <= 0.1) {
			// Remove element
			$(cursor).remove();
			return
		}

		$(cursor).transition({
			opacity: newOpacity,
			scale: newScale
		}, 2000)
	});	
	timeout = setTimeout(ageCursors, 2000);
}
