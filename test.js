import test from 'ava';
import fn from './';

test(async t => {
	const data = await fn('gulp+language:javascript', {token: '523ef691191741c99d5afbcfe58079bfa0038771'});

	t.falsy(data.incomplete_results);
	t.truthy(data.items.length);
	t.is(data.items[0].name, 'gulp');
});
