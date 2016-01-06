import test from 'ava';
import fn from './';

test(async t => {
	const token = '523ef691191741c99d5afbcfe58079bfa0038771';
	const data = await fn('gulp+language:javascript', {token: token});

	t.notOk(data.incomplete_results);
	t.ok(data.items.length);
	t.is(data.items[0].name, 'gulp');
});
