# geo-playground demo

This demo shows some basic data available via HTML's `geoLocation` API. At its core, this tells you where the user is using latitude and longitude as a spatial reference. Depending on the device and browser, additional information might be available, such as the user's current speed, direction, altitude and the confidence of the positioning.

Only devices equipped with GPS (such as mobile) offer high resolution positioning. Other devices use a inferred position, based on wifi access points. For many parts of the world, this can be a remarkably accurate technique, but you might notice strange behaviour if your device jumps between different access points.

After wiring-up button clicks, we add create a [Leaflet](htttp://leafletjs.com) map and add a "tile layer" to it. Tile layers provide satellite images, maps and so forth, and Leaflet allows you to use tiles from various providers - most require you to sign up for some kind of account in order to use their services. Leaflet is a simple toolkit for showing maps, overlaying information and handling basic interaction such as panning and zooming.

We add a circle to the map with some initial properties, and keep track of it with a variable. Every time we get a new position of the user, we update the circle to show the user's current location and set the size of the circle based on the accuracy of the reading.

The location is fetched using the `requestLocation` function which requests the location. Two callback functions are named: `onPositionReceived` and `onPositionError` - this is how we find out the outcome of the location request (good or bad). If an error occurs, we update the UI and flash up a warning. If we get a location, we show the details of the location (and also print it to the console) and update the map and circle.

If the user clicks on the map, we log the coordinates to a panel. This is useful for finding out the lat/lon of a place you know on the map.

The last thing the demo shows is the `watchPosition` feature of the geoLocation API. When using this technique, rather than having to keep checking the user's location (which drains battery), your code will be notified when the location changes. On the downside, this can make debugging difficult because you actually have to move around to see an effect.

## Fake Locations

To make testing easier, you can fake your location. Open up Chrome's console, and click the icon that looks a bit like '>=', to toggle the console drawer. Click "Emulation" and then "Sensors". From there, turn on "Emulate geolocation coordinates", and type in the lat/lon you want to fake, and then refresh the page.

[Read more on overriding location](https://developers.google.com/chrome-developer-tools/docs/mobile-emulation#device-geolocation-overrides)

## Read more
* [Overview on Geolocation](http://diveintohtml5.info/geolocation.html)
 [Geolocation technical docs](https://developer.mozilla.org/en/docs/WebAPI/Using_geolocation)
* Map library, [Leaflet Quickstart](http://leafletjs.com/examples/quick-start.html)
* Map library, [Leaflet API reference](http://leafletjs.com/reference.html)
* [Geolib](https://github.com/manuelbieh/Geolib) (included in Kattegat `libraries.js`)
* [Gelocation overrides](https://developers.google.com/chrome-developer-tools/docs/mobile-emulation#device-geolocation-overrides)