# cv-face

This sample uses [jsfeat](http://inspirit.github.io/jsfeat/) to perform image processing of webcam images. A box is moved and scaled according to horizontal face movement and distance.

A video stream is made up of *frames*, which is basically just like a single photograph. Using HTML5 APIs, we pipe frames from the webcam stream into jsfeat, and if we are able to do this quickly enough, we can get some pretty smooth interaction.

Important notes
* running this code really burns up your CPU, so be sure have your laptop plugged in. It most likely won't work on mobile platforms because of the processing requirements.
* image processing requires having a decent amount of ambient light to work. Strong sunlight or reflections can also hamper processing.

A lot of the image processing code is very complex, but for the most part you don't need to worry about it -- all you care about is the image processing result, which is an array of easy to use objects.

Check out the demo links on the [jsfeat website](https://github.com/inspirit/jsfeat) to see what else is possible.

## Things to try
* Can you make the square go up and down with vertical movement?
* Can you make a "peek a boo" game by monitoring when tracking starts or stops?
* Can you add a 'calibration' routine, so it takes the starting face position as the zero point rather than the center of the webcam image?
* Can you make use of multiple face detection?

## Read more
* [jsfeat demos](https://github.com/inspirit/jsfeat)
* [jsfeat API](http://inspirit.github.io/jsfeat/)
* [Hand tracking with JS](https://code.google.com/p/js-handtracking/)