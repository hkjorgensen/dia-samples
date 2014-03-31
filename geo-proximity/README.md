# geo-proximity demo

This demo builds on some basics from `geo-playground`, showing you how to see distance between people viewing the same page. Most of the code is to set up the realtime communication plumbing,and to update the interface. We use `geolib.getDistance` to calculate the distance between our own user and the coordinates of each other user.

A `setTimeout`-based loop is used to query the user's location every so often, sending out the location to all other clients. To demonstrate how to send out other events using Kattegat's realtime library, there's also the "pulse" button.

Some interaction design challenges:
* Try to get a feel for the distance calculation. What kind of human interactions does it seem useful for? Eg is it reliable enough to let you know if people are in the same building? same room? next to each other?
* What kinds of interaction design might be improved if we assume that we know people's physical proximity? (to each other, or to the artifact)
* How can you mitgate the latency of location checking and updating? How might the interaction be designed to smooth over this? (and is this something we should do?)
* What should the behaviour be when no location is available? Imagine you are designing a location based game - what happens to the player if they go "off the grid"? Is this a form of cheating, or perhaps just resourceful playing?

## Fake Locations

To make testing easier, you can fake your location. Open up Chrome's console, and click the icon that looks a bit like '>=', to toggle the console drawer. Click "Emulation" and then "Sensors". From there, turn on "Emulate geolocation coordinates", and type in the lat/lon you want to fake, and then refresh the page.

[Read more on overriding location](https://developers.google.com/chrome-developer-tools/docs/mobile-emulation#device-geolocation-overrides)

## Read more
* [Overview on Geolocation](http://diveintohtml5.info/geolocation.html)
* [Generate a API key for CloudMade](http://account.cloudmade.com/register)
* [Geolocation technical docs](https://developer.mozilla.org/en/docs/WebAPI/Using_geolocation)
* Map library, [Leaflet Quickstart](http://leafletjs.com/examples/quick-start.html)
* Map library, [Leaflet API reference](http://leafletjs.com/reference.html)
* [Geolib](https://github.com/manuelbieh/Geolib) (included in Kattegat `libraries.js`)
* [Gelocation overrides](https://developers.google.com/chrome-developer-tools/docs/mobile-emulation#device-geolocation-overrides)