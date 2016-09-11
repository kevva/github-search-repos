# github-search-repos [![Build Status](https://travis-ci.org/kevva/github-search-repos.svg?branch=master)](https://travis-ci.org/kevva/github-search-repos)

> Search GitBub repositories


## Install

```
$ npm install --save github-search-repos
```


## Usage

```js
const githubSearchRepos = require('github-search-repos');

githubSearchRepos('gulp+language:javascript').then(data => {
	console.log(data.items);
	//=> [{id: 11167738, name: 'gulp', full_name: 'gulpjs/gulp', ...}, ...]
});
```

## API

### githubSearchRepos(query, [options])

#### query

Type: `string`

[Search query.](https://help.github.com/articles/search-syntax/)

#### options

##### token

Type: `string`

Token to authenticate with. Use this to increase the request count. Github supports up to 5 unauthenticated request per minute.

If you don't have a token you can generate a new one [here](https://github.com/settings/tokens/new).

##### sort

Type: `string`

Sort results by either `stars` , `forks` or `updated`. By default, results are sorted by best match.


## Related

* [github-search-repos-cli](https://github.com/kevva/github-search-repos-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
