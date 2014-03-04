audio-play
==========

This demo shows you how to play a sample (onPlayClick) and also how to set up a sequence of audio playback so that samples play in sync (onPlayRhythm).

First we have to initialise the 'audio context', by calling kattegatAudio.initialize. We get back a reference to the audio context which we keep in the variable `audio` so we can use it elsewhere in our code. We then load up the samples we want to play (these can be WAV or MP3 files).

Loading samples does not block our code: after we call `load` or `loadSet` our code continues to run even though the samples have not finished loading. This kind of thing could therefore fail:

````
kattegatAudio.load('cowbell', 'cowbell.wav');
kattegatAudio.play('cowbell');
````

In this demo we don't do anything smart - we presume that the samples are loaded by the time the user clicks on of the play buttons. Each `load` function lets us specify a callback function - code that will run after the loading is complete. In the demo we simply use the callback function to print a message to the console, but if we want to load a sample and play it when it's loaded, we could use the callback function like this:

````
kattegatAudio.load('cowbell', 'cowbell.wav', function(name) {
	kattegatAudio.play(name);
});
````

The sequenced playback looks kind of complicated, but it mostly comes down to time intervals in music. For most purposes it's easier to playback pre-sequenced audio loops. Eg, you might have a 4-4 kick drum loop which you start at the same time as a high-hat loop or whatever. If you trigger them to play at the same time (and they are recorded at the same tempo), they will play in sync without the complexity of timing.

Things to try:
* Make a new button to play a different sample you find from the web
* Make a simple jukebox with stop/start previous/next functionality.
* Make a remote control interface for your jukebox using Kattegat's realtime feature
* How could the user change the tempo of the sequencer?
* Can you make it possible to mute different parts of the sequencer, eg the kick, snare or hihat

Read more:
* [Getting started with WebAudio](http://creativejs.com/resources/web-audio-api-getting-started/)
* [Introduction to WebAudio](http://www.html5rocks.com/en/tutorials/webaudio/intro/)
* Google's [Web Audio Examples](http://chromium.googlecode.com/svn/trunk/samples/audio/index.html)