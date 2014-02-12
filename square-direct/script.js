var speed = 1.0;
var moveBy = 5;

$(document).ready(function() {	
	// Listen for keypress events anywhere
	$(document).on("keydown", onKeydown);
	$(document).on("keyup", onKeyup);
	$(document).on("keypress", onKeypress);
});

function handleConsole(e) {
	var text = $("#console input").val();
	var split = text.split(" "); 

	$(e.target).select();
}

function increaseSpeed() {
	speed += 0.5;
	return speed;
}
function resetSpeed() {
	speed = 1.0;
}

// Here we have a 'map' of key codes. Each array is a row of keys,
// and each element of the sub-array is the key code, listed in order
// left to right.
//
// These key codes might be different on non English-layouts!
var keys = [
		[49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187],
		[81,87,69,82,84, 89, 85, 73, 79, 80, 91, 221],
		[65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220],
		[90, 88, 67, 86, 66, 78, 77, 188, 190, 191]
	]
	
// Find a key code in the map, returning the row, column and a
// relative position. The relative position refers to the left-to-right
// location (0 being far left, 1 being far right) 
function findKey(e) {
	for (var i=0;i<keys.length;i++) {
		var keySet = keys[i];
		for (var x=0;x<keySet.length;x++) {
			if (keySet[x] == e.which) return {
					row: i,
					col: x,
					relative: (x/keySet.length)
				};
		}
	}
	return null;
}

function onKeypress(e) {
	if (e.which == 32) { 
		// Space bar. Make a square based on the properties of the brush
		makeSquare({
			left: $("#squarePlaceholder").css("left"),
			top: $("#squarePlaceholder").css("top"),
			"background-color": $("#squarePlaceholder").css("background-color"),
			"scale": $("#squarePlaceholder").css("scale")
		});
		return false
	}
}

// Based on the key's spatial position, change some 
// CSS properties of the brush
function handleKeymap(keyMap) {
	var bg = $("#squarePlaceholder").css("background-color");
	var hsv = tinycolor($("#squarePlaceholder").css("background-color")).toHsv();
	var scale = $("#squarePlaceholder").css("scale");
	if (keyMap.row == 0) {
		// Size: Make range 0.5 - 1.5
		scale = keyMap.relative + 0.5;
	} else if (keyMap.row == 1) {
		// Hue
		hsv.h = keyMap.relative * 100;
	} else if (keyMap.row == 2) {
		// Sat
		hsv.s = keyMap.relative;
	} else if (keyMap.row == 3) {
		// Lum
		hsv.v = keyMap.relative;
	}
	$("#squarePlaceholder").css({
		"background-color": "#" +tinycolor(hsv).toHex(),
		scale: scale
	});
}

function onKeydown(e) {
	var keyMap = findKey(e);
	if (keyMap !== null) {
		handleKeymap(keyMap);
		return false;
	}

	var distanceToMove = moveBy*increaseSpeed()
	var brushWidth = $("#squarePlaceholder").outerWidth();
	
	// If shift is held, jump by the size of the brush
	if (e.shiftKey) distanceToMove = brushWidth;

	// Handle cursors
	if (e.which == 37) { // Left
		setPlaceholder({
			left: "-=" + distanceToMove
		})
	} else if (e.which == 39) {// Right
		setPlaceholder({
			left: "+=" + distanceToMove
		})
	} else if (e.which == 38) {// Up
		setPlaceholder({
			top: "-=" + distanceToMove
		})
	} else if (e.which == 40) { // Down 
		setPlaceholder({
			top: "+=" + distanceToMove
		})
	}
}


function onKeyup(e) {
	if (e.which >= 37 && e.which <= 40) {
		// Reset speed if a cursor key went up
		resetSpeed();
	}
}

function setPlaceholder(css) {
	$("#squarePlaceholder").css(css);
}

// Makes a square, and assigns the CSS properties
// contained in the 'css' argument
function makeSquare(css) {
	var x = $('<div class="square"></div>')
		.appendTo("body");
	
	x.css(css);
}