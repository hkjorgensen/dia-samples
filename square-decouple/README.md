# square-decouple demo

The demo consists of two sets of pages (canvas and input), each of which can be loaded independently on any number of devices. It is a small extension of the "square" sample, and demonstrates decoupling of input and output.

The input page (input.html and input.js) emits commands using [the realtime features of Kattegat](https://github.com/ClintH/kattegat/blob/master/DOCS.md#realtime). The canvas page listens for events sent by the input and renders a square based on the received CSS properties.

In this set up, the input receives the user input, parses it, figures out what kind of square that should be made, and then tells the canvas quite directly what to render. In this sense, the canvas is rather dumb - it just draws whatever it is told. One could imagine a different set up whereby the user's input is sent to the canvas, where the logic of parsing and figuring out what to draw is done. In this alternative scenario, the input page would be the simple one.

Figuring out where it is best to base the logic and control depends on the imagined usage scenario, and in a real product also where you to have access control.

## Dig deeper
* Look at input.js and see how data is emitted via socket.io, and check the corresponding event handler in canvas. Get an sense of how and where data goes 'in', and where and how it comes 'out' again
* Try changing the data exchange format, or adding new commands which input.js can send - for example to delete squares from the canvas
* Try a more radical refactoring by making the input parsing happen on the cavas side rather than input side
* Use the '_clientId' field to make squares from different clients appear differently
* Design for speed. At the moment the client sends the full parameters of the square to make. How could this information be reduced, for example to improve throughput?

## Introduced to
This sample introduces you to:
* The realtime features of Kattegat
* For more, see the supplied demos.