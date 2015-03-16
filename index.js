'use strict';

var got = require('got');

module.exports = function (query, opts, cb) {
	opts = opts || {};

	if (typeof query !== 'string') {
		throw new Error('Search query required');
	}

	if (!cb && typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	var url = 'https://api.github.com/search/repositories?q=' + query;
	var headers = {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'https://github.com/kevva/github-search-repos'
	};

	if (opts.token) {
		headers.Authorization = 'token ' + opts.token;
	}

	if (opts.sort) {
		url += '&sort=' + opts.sort;
	}

	got(url, {headers: headers}, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, JSON.parse(data));
	});
};
