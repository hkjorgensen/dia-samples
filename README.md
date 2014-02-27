dia-samples
===========

The samples should be placed within the 'public' directory where you ran the Kattegat generator.
This will be the same place as the template page is found.

The code for each sample is well-documented, and further notes are in README.md

You can grab the code on the [Github website](https://github.com/ClintH/dia-samples/) as a [zip](https://github.com/ClintH/dia-samples/archive/master.zip) file, use a Github app.

## Kattegat Generator

If you have installed Kattegat, the samples will be automatically downloaded and put in your 'public/' directory, under 'dia-samples'. Therefore to access the samples, open up `http://localhost:3000/dia-samples/`

If you want to update these installed samples, you can run

````
$ grunt update
`````

(which will update the samples along with some other Kattegat things)

or to update just the samples:

````
$ cd public/dia-samples
$ git pull
````


## Via git
Change to a directory where you would like to keep a copy of the samples. For example:

````
$ cd /Users/clint/code
````

Use git to clone a copy of the repository:

````
$ git clone https://github.com/ClintH/dia-samples.git
````

You can now copy this into the `BASE\public` directory for Kattegat, and hack on it there.

If the samples get updated, simply go to dia-samples subdirectory and pull changes:

````
$ cd /Users/clint/code/dia-samples
$ git pull
````

## Remote debugging
Remote debugging is available for iOS and Android with a laptop.

* [How to remote debug on iOS](http://moduscreate.com/enable-remote-web-inspector-in-ios-6/)
* [How to remote debug on Android](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)
