speech-input
============

This demo shows you how to use voice-recognition API. This only works with Chrome on a laptop.

We setup a new instace of ```webkitSpeechRecognition``` and save a references to the variable ```recognition``` for later use.
The instance supports a couple of events like ```start```, ```end```, ```result``` that we can use to hook up functions.

```onPointerDown``` will make the isntance listen for input through the computer microphone.
You will be prompted to allow this, due to Chromes built-in security layer.

```onStart``` will fire when you allowed access to the microphone and started talking :-)

```onEnd``` will fire when you stopped talking.

```onResult``` will fire when there is match from the voice-recognition service.
It provides an argument ```e``` where we can find various information such as the recognized text.
All commands are located in the ```commands``` variable and are case sensitive.

Things to try:
* Add more voice commands
* Would it be possible to do a more complicated system with more layers?

Read more:
* [Introduction to the Web Speech API](http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API)
