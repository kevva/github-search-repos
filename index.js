'use strict';
const ghGot = require('gh-got');

module.exports = (query, opts) => {
	opts = opts || {};

	if (typeof query !== 'string') {
		return Promise.reject(new TypeError(`Expected a \`string\`, got \`${typeof query}\``));
	}

	let url = `search/repositories?q=${query}`;

	if (opts.sort === 'forks' || opts.sort === 'stars' || opts.sort === 'updated') {
		url += `&sort=${opts.sort}`;
	}

	return ghGot(url, opts).then(res => res.body);
};
