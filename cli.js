#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const figures = require('figures');
const inquirer = require('inquirer');
const meow = require('meow');
const opn = require('opn');
const githubSearchRepos = require('./');

const cli = meow({
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

const listResults = repos => {
	inquirer.prompt([{
		name: 'results',
		message: 'Search results:',
		type: 'list',
		choices: repos.map(x => {
			const stars = x.stargazers_count + figures.star;
			const fullName = x.full_name.split('/');

			return {
				name: fullName[0] + '/' + chalk.blue.bold(fullName[1]) + ' ' + chalk.dim(stars),
				value: x.html_url
			};
		})
	}], answer => {
		opn(answer.results);
	});
};

const init = () => {
	inquirer.prompt([{
		name: 'query',
		message: 'Search for GitHub repositories'
	}], answer => {
		githubSearchRepos(answer.query).then(data => {
			listResults(data.items);
		});
	});
};

if (cli.input.length === 0) {
	init();
} else if (cli.flags.interactive) {
	githubSearchRepos(cli.input[0], cli.flags).then(data => {
		listResults(data.items);
	});
} else {
	githubSearchRepos(cli.input[0], cli.flags).then(data => {
		for (const x of data.items) {
			const stars = x.stargazers_count + figures.star;
			const fullName = x.full_name.split('/');

			console.log([
				`${fullName[0]}/${chalk.blue.bold(fullName[1])} ${chalk.dim(stars)}`,
				x.description,
				chalk.dim(x.html_url),
				''
			].join('\n'));
		}
	});
}
