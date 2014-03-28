var startPos = null;
var timerId = null;
var ourColour = "green";
var socket = null;
var roomName = "geo-zones";
var ourName = "?";
var ourId = null;
var users = {};

function nameSetClick(e) {
	e.preventDefault(); // prevent form from submitting
	ourName = $("form input[name='name']").val();
}

$(document).ready(function() {
	$("#setButton").on("click", nameSetClick);
	$("#pulseButton").on("click", pulseClick);

	// Assign a random colour for ourselves
	ourColour = getRandomColour();
	
	// Connect realtime stuff up
	socket = io.connect("http://" + window.location.host);
	socket.on("hello", onHello);
	socket.on("say", onSay);
	socket.on("leave", onLeave);

	// Start location-fetching loop
	timerId = setTimeout(requestLocationLoop, 2000);
})

// This function calls itself every 2000 milliseconds,
// looping until the timer is called
function requestLocationLoop() {
	navigator.geolocation.getCurrentPosition(onPositionReceived, onPositionError, {
		enableHighAccuracy: true,
		timeout: 1000 // how to wait for a position
	});
	if (timerId == null) return;
	timerId = setTimeout(requestLocationLoop, 2000);
}

// Callback when an error occurs
function onPositionError(error) {
		kattegat.notifyError(error.message);
		$("#position").text(error.message);
}

// Called when our 'getCurrentPosition' request finishes and there is a position
function onPositionReceived(e) {
	var coords = e.coords;

	// Show current info for debug use
	$("#position").text(JSON.stringify(coords));

	// Construct data to send
	var data = {
		room: roomName,
		coords: coords,
		name: ourName,
		colour: ourColour
	}

	// Send data
	socket.emit("say", data);

	// Calculate our relation to other users
	computeDistances(coords);

	// Update debug display to show live
	// and calculated data
	updateUsersDisplay();
}

function computeDistances(coords) {
	_.each(users, function(user, id) {
		user.distance = geolib.getDistance(coords, user.coords);
	})
}

function updateUsersDisplay() {
	// Update the graphical display for each user
	// (this is just for debugging purposes)
	_.each(users, function(user, id) {
		// We presume that each user has a corresponding HTML
		// element 'user-[id of user]', eg 'user-sdf'
		var selector = "#user-" + id;
		// Show calculated distance
		$(".info", selector).text(user.distance+"m away");
	});
}

// Computes distance and is in/out for each zone
function computeCircleZones(coords) {
	_.each(circleZones, function(zone, name) {
		var center = {
			latitude: zone.coords[0],
			longitude: zone.coords[1]
		};

		zone.distance = geolib.getDistance(coords, center);
		zone.inside = geolib.isPointInCircle(coords, center, zone.radiusMeters)
	});
}

function onSay(e) { 
	if (e.coords) {
		// Keep track of location
		users[e._clientId] = e;
		var selector = addOrGetUser(e._clientId);
		$(".swatch", selector).css("background-color", e.colour);
		$("h1", selector).text(e.name);	
	} else if (e.pulse) {
		// Received a pulse
		$("#user-" + e._clientId).transition({
			"background-color": "red"
		}, 500, function() {
			$(this).css("background-color", "white")			
		});
	
	} else {
		// Some other type of message
		console.dir(e);
	}
}

function pulseClick(e) {
	e.preventDefault();
	socket.emit("say", {
		room:roomName,
		pulse: true
	});
}

function addOrGetUser(id) {
	if ($("#user-" +id).length == 0) {
		$("#users").append(
			'<div id="user-' + id + '" class="user">' +
				'<span class="swatch"></span><h1>' + id +'</h1>' +
				'<div class="info"></div>' +
			'</div');
	}
	return "#user-" + id;
}

// Another user has disconnected
function onLeave(e) {
	console.dir(e);
	var id = e.id;
	delete users[id];
	$("#user-"+id).remove();
}

// Connected to server
function onHello(e) {
	// Join a named 'room'
	// We'll only send and receive messages to this room
	socket.emit("join", {room:roomName});
	ourId = e.id;
	//updateOurInfo();	
}


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

