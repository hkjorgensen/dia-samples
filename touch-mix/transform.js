// Initialise a few variables
var socket = null;
var timeout = null;
var xValue = 0;
var yValue = 0;
var zValue = 0;

$(document).ready(function() {
	// Prevent normal iOS/Android touch gestures
	$('body').on('touchmove', function(e) { e.preventDefault() });

	// Hammer time
	$('body').hammer({prevent_default:false});

	// Listen for some events
	$('body').on('drag', onDrag);
	$('body').on('pinch', onPinch);
	$('body').on('doubletap', reset);

	// Connect realtime stuff up
	socket = io.connect("http://" + window.location.host);
	socket.on("say", onSay);

	reset();
});

// Triggered when other transform controllers change
// their value
function onSay(e) {
	if (e.type == "transform") {
		updateValue(e.x, e.y, e.z);
	}
}

function reset(e) {
	// Reset
	updateValue(0, 0, 1);
	emitValues();
}

function onDoubletap(e) {
	
	// On touch devices, we sometimes get an extra doubletap
	// event that we don't want. It seems to have an abnormally
	// low deltaTime field, so we'll use that to filter them out
	if (e.gesture.deltaTime < 2) return;

	var swatchCount = $("#swatches").children().length +1;

	var h = '<div>' + swatchCount + '</div>';
	$(h).appendTo("#swatches").css('background-color', 'silver');
}

function onPinch(e) {
	var g = e.gesture;
	var newZ = g.scale;
	updateValue(xValue, yValue, newZ);
	emitValues();

}
function onDrag(e) {
	// Gesture field has the juicy info
	var g = e.gesture;

	// Divide by 1000 to make control much sloooower
	var scaledDistance = g.distance / 100;
	var newX = xValue;
	var newY = yValue;
	if (g.interimDirection == "right")
	 	newY += scaledDistance;
	else if (g.interimDirection == "left")
		newY -= scaledDistance;
	else if (g.interimDirection == "up")
		newX += scaledDistance;
	else if (g.interimDirection == "down")
		newX -= scaledDistance;
	
	updateValue(newX, newY, zValue);
	emitValues();
}

// Send our current values to the main page, 
// and all other palettes
function emitValues() {
	socket.emit("say", {
		type: "transform",
		x: xValue,
		y: yValue,
		z: zValue
	})
}
function normalise(input, min, max) {
	if (input < min) input = max + input;
	else if (input > max) input = max - input;
	return input
}
function updateValue(newX, newY, newZ) {
	newX = normalise(newX, 0, 360);
	newY = normalise(newY, 0, 360);
	if (newZ < 0) newZ = 0;

	// Set normalised values
	xValue = newX;
	yValue = newY;
	zValue = newZ;
	
	// Update a info box (useful for debugging)
	$("#xValue").text(Math.round(xValue));
	$("#yValue").text(Math.round(yValue));
	$("#zValue").text(Math.round(zValue));

	$("#demoTransform").css({
		'rotateY': yValue +'deg',
		'rotateX': xValue +'deg',
		'scale': zValue
	})
}