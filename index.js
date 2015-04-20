'use strict';

var ghGot = require('gh-got');

module.exports = function (query, opts, cb) {
	opts = opts || {};

	if (typeof query !== 'string') {
		throw new Error('Search query required');
	}

	if (!cb && typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	var url = 'search/repositories?q=' + query;

	if (opts.sort === 'forks' || opts.sort === 'stars' || opts.sort === 'updated') {
		url += '&sort=' + opts.sort;
	}

	ghGot(url, opts, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, data);
	});
};
