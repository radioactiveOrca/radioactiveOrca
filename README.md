# Movie Dash

Make finding a movie to watch a breeze!

![alt tag](http://i.imgur.com/Mb2JiSL.png)

## Team

  - __Product Owner__: Alex Castle
  - __Scrum Master__: Kiyomi Li
  - __Development Team Members__: Kenneth Ho, Jeremy Hui

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Movie Dash works in a browser. Just open it up.

## Requirements

- Node 0.10.x
- Express 4.13.3
- Angular

## Development

8/5/15: Development begun.

## Getting Started

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
```

### Acquire API keys

Visit Google's [developer console](https://console.developers.google.com/project) to obtain an API key.
Create a file on in ./server named googleKey.js and paste the following:
```js
module.exports.google = GOOGLE_API_KEY;
```

In the same file, add an API key for The Movie Database ([TMDb](https://www.themoviedb.org/documentation/api?language=en)) :
```js
module.exports.moviedb = MOVIE_DB_API;
```

### Grunt

To build and run local server, from root directory:
```sh
grunt
```

To deploy to Heroku:
```sh
grunt deploy -prod
```


### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.# radioactiveOrca
