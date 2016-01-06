'use strict';
var ghGot = require('gh-got');
var Promise = require('pinkie-promise');

module.exports = function (query, opts) {
	opts = opts || {};

	if (typeof query !== 'string') {
		return Promise.reject(new Error('Search query required'));
	}

	var url = 'search/repositories?q=' + query;

	if (opts.sort === 'forks' || opts.sort === 'stars' || opts.sort === 'updated') {
		url += '&sort=' + opts.sort;
	}

	return ghGot(url, opts).then(function (res) {
		return res.body;
	});
};
