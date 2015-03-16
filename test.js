'use strict';

var githubTokenUser = require('./');
var test = require('ava');

test(function (t) {
	t.plan(4);
	var token = '523ef691191741c99d5afbcfe58079bfa0038771';

	githubTokenUser('gulp+language:javascript', {token: token}, function (err, data) {
		t.assert(!err, err);
		t.assert(!data.incomplete_results);
		t.assert(data.items.length);
		t.assert(data.items[0].name === 'gulp');
	});
});
