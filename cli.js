#!/usr/bin/env node
'use strict';
var chalk = require('chalk');
var figures = require('figures');
var inquirer = require('inquirer');
var meow = require('meow');
var opn = require('opn');
var githubSearchRepos = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ github-search-repos',
		'  $ github-search-repos gulp',
		'  $ github-search-repos gulp+languge:javascript',
		'',
		'Options',
		'  -i, --interactive  Show results in interactive interface',
		'  -s, --sort         Sort results by either `stars`, `forks` or `updated`',
		'  -t, --token        GitHub authentication token'
	]
}, {
	boolean: ['interactive'],
	string: [
		'sort',
		'token'
	],
	alias: {
		i: 'interactive',
		s: 'sort',
		t: 'token'
	}
});

function listResults(repos) {
	inquirer.prompt([{
		name: 'results',
		message: 'Search results:',
		type: 'list',
		choices: repos.map(function (repo) {
			var stars = repo.stargazers_count + figures.star;
			var fullName = repo.full_name.split('/');

			return {
				name: fullName[0] + '/' + chalk.blue.bold(fullName[1]) + ' ' + chalk.dim(stars),
				value: repo.html_url
			};
		})
	}], function (answer) {
		opn(answer.results);
	});
}

function init() {
	inquirer.prompt([{
		name: 'query',
		message: 'Search for GitHub repositories'
	}], function (answer) {
		githubSearchRepos(answer.query).then(function (data) {
			listResults(data.items);
		});
	});
}

if (!cli.input.length) {
	init();
	return;
} else {
	if (cli.flags.interactive) {
		githubSearchRepos(cli.input[0], cli.flags).then(function (data) {
			listResults(data.items);
		});
	} else {
		githubSearchRepos(cli.input[0], cli.flags).then(function (data) {
			data.items.forEach(function (repo) {
				var stars = repo.stargazers_count + figures.star;
				var fullName = repo.full_name.split('/');

				console.log([
					fullName[0] + '/' + chalk.blue.bold(fullName[1]) + ' ' + chalk.dim(stars),
					repo.description,
					chalk.dim(repo.html_url),
					''
				].join('\n'));
			});
		});
	}
}
