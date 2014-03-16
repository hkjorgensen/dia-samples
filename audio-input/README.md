audio-filter
============

This demo builds on audio-play and demonstrates how to set up a signal path. In this case, we insert a filter between the audio source (the loaded sample) and the output (your computer speakers). Web Audio lets you set up many kinds of creative routing where the output of one node goes into the next - much like patching a regular audio equipment.

In the document ready, we initialize the audio context, which we set to the 'audio' variable so it's available throughout our code. The audio context is needed for creating the filter.

Rather than a single-shot sample, in this demo we set the sample to play continuously, by setting the 'loop' field to true. We use the function 'createBiquadFilter' to make the kind of node we want (see the tutorials below for more on the kinds of nodes you can make), and then wire it up with the source and speakers using the 'connect' functions.

Once all that plumbing is done, we start playback (and hide the start button).

If the user hits the stop button, we stop listening for pointermove events, show the start button again (and hide the stop button), and then call 'stop' on the audio source.

When the loop is playing we listen for pointermove events. In the event handler (onPointermove) we do some basic processing of the x/y coordinates of the pointer. We need to map pixel values to numbers that make sense for the filter. We figured out some of these numbers based on the documentation for the BiquadFilter and also by playing with it. Setting the values of the filter applies the effect immediately.

Things to try:
* Experiment with other filter types. In the setupAndPlayLoop function we set the type to 0, which is a low-pass filter. You can try other kinds of filters for different effects
* Can you try other mappings of input to control the filter frequency and Q value?
* Experiment with different node types. For example, there is a node that adjusts volume, can you rip out the filter stuff and allow the user to control volume instead?


Read more:
* Different filter modes: [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)
* [Getting started with WebAudio](http://creativejs.com/resources/web-audio-api-getting-started/)
* [Introduction to WebAudio](http://www.html5rocks.com/en/tutorials/webaudio/intro/)
* Google's [Web Audio Examples](http://chromium.googlecode.com/svn/trunk/samples/audio/index.html)