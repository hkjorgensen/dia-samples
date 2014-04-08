var video = null;
var preview = null;
var buffer = null;
var c = null;
var imgU8 = null;
var tracking = false;

// Sample is a port of jsfeat's sample_bbf_face' demo
//  http://inspirit.github.io/jsfeat/sample_bbf_face.html
$(document).ready(function() {
	// Prevent normal iOS/Android touch gestures
	$('body').on('touchmove', function(e) { e.preventDefault() });
  $("#previewButton").on("click", togglePreview);
  $("#stopButton").on("click", stopProcessing);
  $("#startButton").on("click", startProcessing);

  // Handle when the window unloads
  $(window).unload(onUnload);

  //console.log(kattegat.rangeScale(0.1, 0, 0.2, 0, 1.0));

  initVideo();
});

function togglePreview() {
  preview.hidden = !preview.hidden; 
  if (preview.hidden) {
    $("#canvas").hide();
  } else {
    $("#canvas").show();
  }

}

function stopProcessing() {
  video.pause();
  $("#stopButton").hide();
  $("#startButton").show();

}

function startProcessing() {
  video.play();
  $("#stopButton").show();
  $("#startButton").hide();
}

function initVideo() {
  // Initialise video
  c = kattegat.compatibility; // A little compatibility layer to simplify coding
  video = $("#video").get(0); // This gets the underlying HTML element rather than a jQuery wrapper

  // Try to get the user's webcam stream
  try {
    c.getUserMedia({video:true}, function(stream) {
      try {
        video.src = c.URL.createObjectURL(stream);
      } catch (e) {
        video.src = stream;
      }
      setTimeout(function() {
        // Start playback of webcam stream
        video.play();

        // Initialise canvas
        initCanvas();

        // This will call 'calculate' at a high rate
        c.requestAnimationFrame(calculate);
      }, 500); // Call the stuff above after half a second
    }, function(e) {
      kattegat.notifyError("Webcam not available on this platform");
      console.log(e);
    })   
  } catch (e) {
    kattegate.notifyError("Webcam not available on this platform");
    console.log(e);
  }
}

// Sets up the canvas
function initCanvas() {
  var maxWorkSize = 160;
  
  // Set up a canvas to display a preview image
  preview = {};
  preview.canvas = $("#canvas").get(0);
  preview.width = canvas.width;
  preview.height = canvas.height;
  preview.middleX = canvas.width/2;
  preview.middleY = canvas.height/2;
  preview.ctx = canvas.getContext('2d');
  preview.ctx.fillStyle = "rgb(0,255,0)";
  preview.ctx.strokeStyle = "rgb(0,255,0)";

  var scale = Math.min(
    maxWorkSize/video.videoWidth, 
    maxWorkSize/video.videoHeight
  );
  var w = (video.videoWidth*scale)|0;
  var h = (video.videoHeight*scale)|0;

  imgU8 = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
  
  // Set up a memory buffer to do processing
  buffer = {};
  buffer.canvas = document.createElement('canvas');
  buffer.width = w;
  buffer.height = h;
  buffer.ctx = buffer.canvas.getContext('2d');
  
  // Set up image processing
  jsfeat.bbf.prepare_cascade(jsfeat.bbf.face_cascade);
}

// Triggered when ever we start tracking a face
function onGotFace() {
  $("#tracking").addClass("active");
}

// Triggered when we can no longer track a face
function onLostFace() {
    $("#tracking").removeClass("active");
    
}

// Triggered when there is are face rectangle(s)
function onFaceRectangles(rects) {
  // Each rectangle contains:
  //  confidence, height, neighbors, width, x, y
  for(var i = 0; i < rects.length; ++i) {
    r = rects[i];
    
    // Calculate size of face relative to camera size
    var area = (r.width*r.height)/(video.width*video.height);
    
    // Area never seems to get beyond 0.0-0.2
    // Scale up to 0.0-1.0
    area = kattegat.rangeScale(area, 0, 0.2, 0, 1.0);

    // Do stuff with just the highest confidence face       
    if (i == 0) {
      // Show the face size (area)
      $("#faceArea").text(area.toFixed(2));
      // Map the face size to font size
      area = 400 - Math.pow(area,2) * 400;
      $("#box").css("font-size", area+ "%");

      // Get current position of the box
      var offset = $("#box").offset();

      // Calculate how far we are from the middle
      // and get a relative measure
      var fromMiddle = (r.x + (r.width/2) - preview.middleX) / preview.width;
      
      // If we're pretty close to the middle, don't move
      // Math.abs gives us the 'absolute number', changing negative to postive
      if (Math.abs(fromMiddle) < 0.04) fromMiddle = 0; 
    
      // Move box to left/right based on how far face is
      // from the middle. Since it's a percentage, we apply that
      // to 50px (which will be the maximum distance at which the box will jump)
      // (To make it slower and smoother, reduce 50 to a smaller number)
      offset.left += fromMiddle*50;
      
      // Make sure we stay on the screen
      if (offset.left < 0) offset.left = 0;
      if (offset.left + r.width > window.innerWidth) {
          offset.left = window.innerWidth - r.width;
      }
      // Set the left property
      $("#box").css("left", offset.left + "px");
    }
    
    // ...we could do stuff with the other rects we get though!

    // Draw a rectangle to help our debugging
    preview.ctx.strokeRect(r.x,r.y,r.width,r.height);  
  }
}

function onUnload() {
  video.pause();
  video.src = null;
}


// Does the work of processing video frames
// This is complicated stuff, the most interesting thing is that
// 'onFaceRectangles' is called when it has recognised some faces!
function calculate() {
  if (video.readyState == video.HAVE_ENOUGH_DATA) {

    // Draw image to preview canvas
    if (!preview.hidden)
      preview.ctx.drawImage(video, 0, 0, preview.width, preview.height);
    
    // Draw image to processing buffer
    buffer.ctx.drawImage(video, 0, 0, buffer.width, buffer.height);
    
    // Now that it's drawn, we are able to copy into memory
    var data = buffer.ctx.getImageData(0, 0, buffer.width, buffer.height);

    jsfeat.imgproc.grayscale(data.data, imgU8.data);
    var pyr = jsfeat.bbf.build_pyramid(imgU8, 24*2, 24*2, 4);

    var rects = jsfeat.bbf.detect(pyr, jsfeat.bbf.face_cascade);
    rects = jsfeat.bbf.group_rectangles(rects, 1);

    // Sort in order of confidence
    jsfeat.math.qsort(rects, 0, rects.length-1, 
      function(a,b) { return (b.confidence<a.confidence);
    });

    var scale= canvas.width/imgU8.cols;
    for (var i=0;i<rects.length; i++) {
      rects[i].width = (rects[i].width * scale)|0;
      rects[i].height = (rects[i].height * scale)|0;
      rects[i].x = (rects[i].x * scale)|0;
      rects[i].y = (rects[i].y * scale)|0;
    }
    
    if (rects.length == 0) {
      // No faces
      if (tracking) {
        tracking = false;
        setTimeout(onLostFace, 200);
      }
    } else if (!tracking) {
      // Started tracking again
      tracking = true;
      setTimeout(onGotFace, 200);
    }

    // Do something with result of processing
    onFaceRectangles(rects);
  }
  c.requestAnimationFrame(calculate); // Get function to be called again
}
