# Another platformer

[![Netlify Status](https://api.netlify.com/api/v1/badges/71ac9d36-b299-425d-ab9d-0d74cb446f0d/deploy-status)](https://another-platformer.netlify.app/)
[![MIT license](https://img.shields.io/github/license/codingAngarita/another-platformer)](https://codingangarita.mit-license.org/)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

<p align="center">
  <img alt="Another platformer" src="https://i.imgur.com/XBl9jpq.png?1" />
</p>

A Phaser 3 platformer game with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/)
that includes hot-reloading for development and production-ready builds.

Used [phaser3-project-template](https://github.com/photonstorm/phaser3-project-template) as a starting template.

Loading images via JavaScript module `import` is also supported.

#### You can read more about the project and how I built it [here](https://www.notion.so/Another-platfomer-252734103ed24f26a87967fd79775c7d)

## How to play
#### Check a live version of the game [here](https://another-platformer.netlify.app/).

You can navigate the menus clicking the desired options.

The game objective is to jump through the platforms collecting all the items you can, everytime you collect an items the platforms start moving more quickly,to move, use the keyboard arrow keys &#8592; &#8593; &#8594; &#8595;

![How to play](https://i.imgur.com/AIzcJc8.png "How to play")

## How to setup the game locally

To run the game locally you should clone this repository, run `npm install` to install all the project dependencies and then you can run `npm start` to start a local web server running the project.

**Be aware, the game uses an `API` to submit and receive all the leaderboard data, you should setup your own `API` to mantain this feature. The section below contains relevant information describing the `API` in detail.**

## Api

Setting up the API is beyond the objective of this project, however here are the needed information to use the built in [api module](https://github.com/codingAngarita/another-platformer/blob/feature/game-logic/src/classes/api.js) as is, please modify it acording to your needs. 

The API consists of an **API_URL** `https://your-leaderboard-api-url/`, an **API_KEY** `1234567890`. 
that contains an endpoint `/scores/` making the final api url: `API_URL` + `API_KEY` + `/scores/`.

The **API_URL** and **API_KEY** values should be setted up in a `.env` file in the root of the project, this `.env` file is already added to the `.gitignore` file, don't commit this file unless you don't mind the API going public. The `.env` file should look something like this:

```
# ./.env
API_URL=https://your-leaderboard-api-url/
API_KEY=1234567890
```

To submit a new score, the API should receive a POST request in JSON format with the following body:
```JSON
{
  "user": "New Score User",
  "score": 39
}
```
To receive all the scores, the API should respond to a GET request to with no parameters, and return a JSON in this format:
```JSON
{
  "result": [
    {
      "user": "Low score user",
      "score": 9
    },
    {
      "user": "High score user",
      "score": 999
    }
  ]
}
```

## Requirements

[npm](https://www.npmjs.com/) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |
| `npm run test` | Runs tests on Api methods |
| `npm run linters` | Runs JS linters |

## Modifying the code

Run `npm install` from your project directory. Then, you can start the local development
server by running `npm start`.


After starting the development server with `npm start`, you can edit any files in the `src` folder
and webpack will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

Please make sure to run the linters & tests before submiting any changes.

## License

This projects uses the MIT license.

### Assets

All the assets used in this project were made by me and "Jeromimo" please reach out before using them.


