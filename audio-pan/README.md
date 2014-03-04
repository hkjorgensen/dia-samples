audio-pan
=========

This demo builds on 'audio-filter' and shows you how to manage playback and filters of multiple samples, and introduces the panner audio node.

We keep track of a lot more state in this demo. One set of variables keeps track of the auto pan, which cycles between -1 and 1, using a timeout to run it continuously.

We also keep track of sources, panners and samples using objects keyed by the sample name. Eg to get the panner for sample 'drums', we can use panners['drums'].

Basic drag and drop is accomplished using Hammer's drag event which we wire up for each sample representation (simple grey squares). The downside of this is that if you drag too quickly the pointer ends up outside of the square, and thus the drag event no longer fires. Unlike earlier demos we also have to be a bit trickier with how we utilise the pointer location, because the grey squares are positioned relative to the white square they live inside of.

This demo also shows good use of functions. For example, the one function 'setupAndPlayLoop' plays any sample we give it the name of. This makes a lot more sense than repeating the code for each sample we want to play (and opens up a host of other possibilities as well).

Things to try:
* At the moment loops get out of sync if you start/stop them individually. Can you change the behaviour to keep them running but selectively mute them? Hint: Look up the 'GainNode'
* Can you combine additional audio nodes to alter playback further? Eg, maybe the volume is changed depending on how high or low the sample is positioned

Read more:
* [Panner](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode) can do some very sophisticated things such as simulating a moving audio source and dampening audio if it's faced away from the listener
* [Positional Audio Demo](http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/)
* Google's [Web Audio Examples](http://chromium.googlecode.com/svn/trunk/samples/audio/index.html)