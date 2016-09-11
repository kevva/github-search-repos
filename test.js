import test from 'ava';
import m from './';

test('search for repositories', async t => {
	const data = await m('gulp+language:javascript', {token: '523ef691191741c99d5afbcfe58079bfa0038771'});

	t.falsy(data.incomplete_results);
	t.truthy(data.items.length);
	t.is(data.items[0].name, 'gulp');
});

test('accepts a string', async t => {
	t.throws(m({}), 'Expected a `string`, got `object`');
});
