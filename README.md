<h1  align="center">Welcome to Only Locks 👋</h1>

<p>

<img  alt="Version"  src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />

</p>

  

> NBA react app. Once registered, users can view stats for every player, team and game in the NBA. Users can also follow teams/players as well as place player prop picks and team moneyline picks. Those picks can be tracked "live" in the app in addition to picks placed by the community. The api-nba api is being used to source all data (https://api-sports.io/documentation/nba/v2). An Only Locks API was created to interface between frontend and PostgreSQL database.

  

### 🏠 [Homepage](https://github.com/Brinzkii/only-locks-frontend)

  

### ✨ [Demo](only-locks.today)

  

## Install

  

```sh

npm  install

```

  

## Usage

  

```sh

npm  run  start

```

  

## Only Locks API

#### 🏠 [Homepage](https://github.com/Brinzkii/only-locks-backend)  

### Available Routes

#### Authentication
```sh
POST /auth/token: { username, password } => { token }
```
```sh
POST /auth/register: { user } => { token }
```

#### Users
```sh
POST / { user } => { user, token }
```
```sh
GET /[username] => { user }
```
```sh
POST /[username]/players/[playerId] => { user }
```
```sh
DELETE /[username]/players/[playerId] => { user }
```
```sh
POST /[username]/teams/[teamId] => { user }
```
```sh
DELETE /[username]/teams/[teamId] => { user }
```
```sh
GET /[username]/picks => { picks }
```
```sh
POST /[username]/picks/player
	- Body must include { playerId, gameId, stat, over_under, value, point_value }
```
```sh
DELETE /[username]/picks/[pickId]
```
```sh
POST /[username]/picks/team
	- Body must include { teamId, gameId, win_spread, value }
```
```sh
DELETE /[username]/picks/[pickId]
```
#### Players
```sh
GET / => { players }
```
```sh
GET /[playerId] => { player }
```
```sh
GET /[playerId]/stats/season => { seasonStats }
```
```sh
POST /[playerId]/stats/game => { gameStats }
	- Can pass in gameId via request body for a specific game's stats
```
```sh
POST /stats/sort
	- Must include stat, time and order in body of request
	- Stat to sort by can include points, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, offReb, defReb, totalReb (season stats only), assists, fouls, steals, turnovers, blocks, plusMinus
```
```sh
POST /stats/picks
	- Must include array of games
```
#### Teams
```sh
GET / => { teams }
```
```sh
GET /standings => { standings }
```
```sh
GET /stats => [ { teamStats }, ... ]
```
```sh
POST /stats/sort => [ { teamStats }, ... ]
	- Must include stat and order in body of request
```
```sh
GET /[teamId] => { team }
```
```sh
GET /[teamId]/stats => { teamStats }
```
```sh
GET /[teamId]/stats/top => { topPerformers }
```
```sh
GET /[teamId]/games => { teamGames }
```
```sh
GET /[teamId]/players => { teamPlayers }
```
```sh
POST /stats/picks
	- Must include array of games
```
#### Games
```sh
GET / => { games }
```
```sh
GET /[gameId] => { game }
```
```sh
GET /[gameId]/stats => { teamStats }
```
```sh
GET /[gameId]/top => { topPerformers }
```
```sh
GET /filter/date/[date]=> { games }
	- Can pass in a date string "YYYYMMDD", "today", "tomorrow", "yesterday"
```
```sh
GET /filter/team/[teamId]=> { games }
```
```sh
GET /h2h/[team1Id]/[team2Id] => { h2h }
```
```sh
GET /[gameId]/picks => [ { pick }, ... ]
```

### Run tests

  Tests are located in the backend and can be run with the following:
  
```sh

npm test

```

  

## Author

  

👤 **Dawson Bezehertny**

  

* Github: [@Brinzkii](https://github.com/Brinzkii)

* LinkedIn: [@dawson-bezehertny](https://linkedin.com/in/dawson-bezehertny)

  

## Show your support

  

Give a ⭐️ if this project helped you!

  

***

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_