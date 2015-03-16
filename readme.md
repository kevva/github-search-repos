# github-search-repos [![Build Status](http://img.shields.io/travis/kevva/github-search-repos.svg?style=flat)](https://travis-ci.org/kevva/github-search-repos)

> Search GitBub repositories


## Install

```
$ npm install --save github-search-repos
```


## Usage

```js
var githubSearchRepos = require('github-search-repos');

githubSearchRepos('gulp+language:javascript', function (err, data) {
	console.log(data.items);
	//=> [{id: 11167738, name: 'gulp', full_name: 'gulpjs/gulp', ...}, ...]
});
```

## API

### githubSearchRepos(query, options, callback)

#### query

*Required*  
Type: `string`

[Search query.](https://help.github.com/articles/search-syntax/)

#### options.token

Type: `string`

Token to authenticate with. Use this to increase the request count. Github supports up to 5 unauthenticated request per minute.

If you don't have a token you can generate a new one [here](https://github.com/settings/tokens/new).

#### options.sort

Type: `string`

Sort results by either `stars` , `forks` or `updated`. By default, results are sorted by best match.

#### callback(error, data)

Type: `function`

##### data

Type: `object`

Search results in the `items` property.


## CLI

```
$ npm install --global github-search-repos
```

```
$ github-search-repos --help

Usage
  $ github-search-repos gulp
  $ github-search-repos gulp+languge:javascript --token 3b21d21c423c423b241

Options
  -s, --sort     Sort results by either `stars` , `forks` or `updated`
  -t, --token    GitHub authentication token
```

## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
