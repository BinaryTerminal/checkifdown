var EventEmitter = require('events').EventEmitter;
var request = require('request');
var statusCodes = require('http').STATUS_CODES;

var emitter = new EventEmitter();
var trackedLinks = [];

function Track(url, timeout) {
	this.website = url;
	this.timeout = timeout;
	var _this = this;
	this.handle = setInterval(function () {
		try {
			request(_this.website, function (error, res, body) {
				if(error) {
					_this.log(1);
				} else {
					_this.log(res && res.statusCode);
				}
			});
		} catch(err) {
			_this.log(0);
		}
	}, this.timeout);
}

Track.prototype.log = function (code) {
	var data = {
	  website: this.website,
	  time: Date.now(),
	};

	switch(code) {
		case 0:
			emitter.emit('ciderror', data);
			break;
		case 1:
			emitter.emit('error', data);
			break;
		case 200:
			emitter.emit('up', data);
			break;
		default:
			emitter.emit('down', data);
			break;
	}
}

module.exports.Track = Track;
module.exports.emitter = emitter;
module.exports.trackedLinks = trackedLinks;
