import test from 'ava';
import m from './';

test('search for repositories', async t => {
	const data = await m('gulp+language:javascript', {token: process.env.GITHUB_TOKEN});

	t.falsy(data.incomplete_results);
	t.truthy(data.items.length);
	t.is(data.items[0].name, 'gulp');
});

test('accepts a string', async t => {
	await t.throws(m({}), 'Expected a `string`, got `object`');
});
