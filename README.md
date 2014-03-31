dia-samples
===========

The samples should be placed within a `public/dia-samples/` directory where you ran the Kattegat generator.

The code for each sample is well-documented, and further notes are in README.md

You can grab the code on the [Github website](https://github.com/ClintH/dia-samples/) as a [zip](https://github.com/ClintH/dia-samples/archive/master.zip) file, or use a GitHub app.

## Kattegat Generator

If you have installed Kattegat, the samples will be automatically downloaded and put in your `public/` directory, under `dia-samples`. Therefore to access the samples, open up `http://localhost:3000/dia-samples/`

Warning: Do not edit the samples inside the dia-samples folder. Instead copy them to `public\` and work on them there. This is so that when you update the samples, your work is not discarded.

If you want to update these installed samples, run:

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

When testing your sketches on a tablet or mobile, it's very usfeul to use "remote debugging" so you can see your `console.log` messsages, inspect the DOM and so on.

Remote debugging is available for iOS and Android, and is very simple to set up. Read more:

* [How to remote debug on iOS](http://moduscreate.com/enable-remote-web-inspector-in-ios-6/)
* [How to remote debug on Android](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)

## Resources

* [Alphabetical list of CSS Properties](http://ref.openweb.io/CSS/)
* [$/jQuery API](http://api.jquery.com)

## Deplying to the web

Many of the samples will work if you put them on a standard web server. It's only those that use the Kattegat realtime or storage features which will not work. For this to work, you'll need to copy some support files and change the reference to these files in your project.

Let's assume you are deploying to a web server via FTP, and your base web directory is `public_html`.

1. Copy `bower_components\libraries.js`, `bower_components\pure\pure-min.css` and `public\base.css` to your `public_html` directory
2. Edit your project's `index.html` file, and change:

````
	<!-- Base stylesheets -->
	<link rel='stylesheet' href='/bower_components/pure/pure-min.css'>
	<link rel='stylesheet' href='/base.css'>
	...
	<!-- Import libraries such as jQuery etc -->
	<script src="/bower_components/libraries.js"></script>
````

to:

````
	<!-- Base stylesheets -->
	<link rel='stylesheet' href='../pure-min.css'>
	<link rel='stylesheet' href='../base.css'>
	...
	<!-- Import libraries such as jQuery etc -->
	<script src="../libraries.js"></script>
````

3. Copy your project's directory to `public_html`. The file structure should look like:

````
public_html
 yourproject\
  index.html
  script.js
  style.css
 pure_min.css
 base.css
 libraries.js
````
