audio-feedback
============

This demo shows you how to use audio feedback based on how far the box is from the screen center. Imagine the user couldn't see the screen and had to position the box in the center.
The beeping intensify when the box is moved closer to the screen center.

We use an ```oscillator``` to generate a sound.

We connect the oscillator to the ```gain``` that adjust the volume

We connect the gain to the ```audio``` that controls the computer speakers.

Read more:
* [Playground](http://webaudioplayground.appspot.com)
* [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)
* [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/gainnode)
