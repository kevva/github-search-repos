'use strict';

var got = require('got');

module.exports = function (query, opts, cb) {
	var url = 'https://api.github.com/search/repositories?q=' + query;
	var headers = {
		Accept: 'application/vnd.github.v3+json',
		Authorization: 'token ' + opts.token,
		'User-Agent': 'https://github.com/kevva/github-search-repos'
	};

	got(url, {headers: headers}, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, JSON.parse(data));
	});
};
