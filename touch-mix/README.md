# touch-mix

This demonstrates how you can take the input from several other pages/browsers/devices to control a single output.

For a bit of added finish, each 'input' page stays in sync with others, and the main page saves/loads its state to the server periodically.

Things to try:
* Can you come up with other input mappings to change the colour and transformation properties?
* Can you set limits on the human input so that the colours are more 'sensible'? Is this worth doing?
* Are there other interesting CSS properties that you can wire up to control remotely?
* Can you trigger functions remotely? Eg, if you tap a button on an input page, the "thing" element is animated.
* When index.js loads, it fetches the last visual state of the thing. This gives us the effect that the thing survives even though we close the browser and come back again tomorrow. When the input pages load, they simply start at their default values. Can you use the same data fetching logic to initalise the controller pages as well?

Read more:
* Kattegat's [storage](http://localhost:3000/demos/store.html) features
* Kattegat's [realtime](http://localhost:3000/demos/realtime.html) features
* lodash's [debounce](http://lodash.com/docs#debounce) function