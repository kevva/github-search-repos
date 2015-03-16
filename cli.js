#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var figures = require('figures');
var meow = require('meow');
var githubSearchRepos = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ github-search-repos gulp',
		'  $ github-search-repos gulp+languge:javascript',
		'',
		'Options',
		'  -s, --sort     Sort results by either `stars`, `forks` or `updated`',
		'  -t, --token    GitHub authentication token'
	].join('\n')
}, {
	string: [
		'sort',
		'token'
	],
	alias: {
		s: 'sort',
		t: 'token'
	}
});

if (!cli.input[0]) {
	console.error('Search query required');
	process.exit(1);
}

githubSearchRepos(cli.input[0], cli.flags, function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	data.items.forEach(function (repo) {
		var stars = repo.stargazers_count + figures.star;

		console.log([
			repo.full_name + ' ' + chalk.dim(stars),
			repo.description,
			chalk.dim(repo.html_url),
			''
		].join('\n'));
	});
});
