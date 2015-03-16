#!/usr/bin/env node
'use strict';

var figures = require('figures');
var meow = require('meow');
var githubSearchRepos = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ github-search-repos gulp',

	].join('\n')
});

githubSearchRepos(cli.input[0], cli.flags, function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	data.items.forEach(function (repo) {
		var stars = repo.stargazers_count + figures.star;

		console.log([
			repo.full_name + ' (' + stars + ')',
			repo.description,
			repo.html_url,
			''
		].join('\n'));
	});
});
