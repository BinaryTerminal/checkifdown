# checkifdown
A simple utility that lets you check if a website is down at regular intervals.

## Basics

A Track is an object that defines a URL to track and an interval to wait between pings.

```javascript
Track(URL, delay);
```

The trackedLinks array contains all of the tracked links. You should push any tracks you set to this array.

The emitter is an eventemitter. You can look for the following events:

* up - the server was reached and returned a 200 status code
* down - the server was reached and returned a 400 or 500 status code
* error - there was an error with the connection and the server could not be reached
* ciderror - there was an error with checkifdown and a connection could not be established (check for invalid URLs)

The emitter returns an object in the following format:

```javascript
{
	time: (time),
	website: (URL)
}
```

## Installation

You can clone this repo with the following command:

```
git clone https://github.com/BinaryTerminal/checkifdown.git
```

## Example

Here's a basic example of how to implement this module in one of your projects.

```javascript
var checkifdown = require('./checkifdown');

checkifdown.emitter.on("up", function(output){console.log(output.time + ": " + output.website+" is up."); });
checkifdown.emitter.on("down", function(output){console.log(output.time + ": " + output.website+" is down."); });

checkifdown.trackedLinks.push(new checkifdown.Track("http://www.google.com", 300000));
checkifdown.trackedLinks.push(new checkifdown.Track("http://www.amazon.com", 300000));
```
