# github-search-repos [![Build Status](http://img.shields.io/travis/kevva/github-search-repos.svg?style=flat)](https://travis-ci.org/kevva/github-search-repos)

> Search Github repositories

## Install

```bash
$ npm install --save github-search-repos
```

## Usage

```js
var githubSearchRepos = require('github-search-repos');

githubSearchRepos('gulp+language:javascript', function (err, data) {
	if (err) {
		throw err;
	}

	console.log(data.items);
	//=> [{id: 11167738, name: 'gulp', full_name: 'gulpjs/gulp', ...}, ...]
});
```

## API

### githubSearchRepos(query, opts, cb)

#### query

Type: `string`

Search query to get results from.

#### opts.token

Type: `string`

Token to authenticate with. Use this to increase the request count. Github supports up to 5 unauthenticated request per minute.

If you don't have a token you can generate a new one [here](https://github.com/settings/tokens/new).

#### cb(err, data)

Type: `function`

`data` contains an object with the search results in the `items` property.

## CLI

```sh
$ npm install --global github-search-repos
```

```sh
$ github-search-repos --help

Usage
  $ github-search-repos gulp
  $ github-search-repos gulp+languge:javascript --token

Options
  -t, --token    Github token to authenticate with
```

## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
