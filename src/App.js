// import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Moment from 'moment';
import schedule from 'node-schedule';
import Navigation from './Navigation';
import Home from './Home';
import User from './User';
import NewPickButton from './NewPickButton';
import GameList from './GameList';
import GameDetails from './GameDetails';
import TeamDetails from './TeamDetails';
import PlayerDetails from './PlayerDetails';
import PlayerStats from './PlayerStats';
import TeamStats from './TeamStats';
import PlayerList from './PlayerList';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OnlyLocksAPI from './OnlyLocksAPI';
import PrivateRoutes from './PrivateRoutes';
import './App.css';

function App() {
	const [data, setData] = useState({
		teams: [],
		games: [],
		players: { points: [], tpm: [], assists: [], rebounds: [], blocks: [], steals: [] },
		date: Moment(),
	});
	const [user, setUser] = useState([]);

	const playerCategories = {
		gp: 'GP',
		minutes: 'MIN',
		points: 'PTS',
		fgm: 'FGM',
		fga: 'FGA',
		fgp: 'FG%',
		ftm: 'FTM',
		fta: 'FTA',
		ftp: 'FT%',
		tpm: '3PM',
		tpa: '3PA',
		tpp: '3P%',
		totalReb: 'REB',
		offReb: 'ORB',
		defReb: 'DRB',
		assists: 'AST',
		fouls: 'PF',
		steals: 'STL',
		turnovers: 'TO',
		blocks: 'BLK',
		plusMinus: '+/-',
	};

	const updateUser = ({ username, token, picks, following }) => {
		async function getData() {}
		if (username) localStorage.setItem('username', username);
		if (token) localStorage.setItem('token', token);
		if (picks) localStorage.setItem('picks', JSON.stringify(picks));
		if (following) localStorage.setItem('following', JSON.stringify(following));
		setUser({ username, token });
		getData();
	};
	const logoutUser = () => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		localStorage.setItem('picks', JSON.stringify([]));
		localStorage.setItem('following', JSON.stringify([]));
		setUser(undefined);
	};
	useEffect(() => {
		async function checkForUser() {
			if (localStorage.token) {
				let user = await OnlyLocksAPI.getUser(localStorage.username);
				const info = {
					username: user.username,
					token: localStorage.token,
					picks: user.picks.playerPicks.concat(user.picks.teamPicks),
					following: user.followedTeams.concat(user.followedPlayers),
				};

				let teams = await OnlyLocksAPI.allTeams();
				const today = Moment().format('YYYYMMDD');
				let games = await OnlyLocksAPI.gamesByDate(today);
				let players = {};
				let points = await OnlyLocksAPI.sortPlayerStats({ time: today, stat: 'points' });
				let tpm = await OnlyLocksAPI.sortPlayerStats({ time: today, stat: 'tpm' });
				let assists = await OnlyLocksAPI.sortPlayerStats({ time: today, stat: 'assists' });
				let rebounds = await OnlyLocksAPI.sortPlayerStats({ time: today, stat: 'total_reb' });
				let blocks = await OnlyLocksAPI.sortPlayerStats({ time: today, stat: 'blocks' });
				let steals = await OnlyLocksAPI.sortPlayerStats({ time: today, stat: 'steals' });
				players.points = points;
				players.tpm = tpm;
				players.assists = assists;
				players.rebounds = rebounds;
				players.blocks = blocks;
				players.steals = steals;

				setData({ teams, games, players });

				localStorage.setItem('username', info.username);
				localStorage.setItem('picks', JSON.stringify(info.picks));
				localStorage.setItem('following', JSON.stringify(user.following));
			}
		}
		checkForUser();

		// Schedule updates to run

		// Game details (score, clock, quarter), player game stats and team stats will update every 15 minutes starting at 7pm each day and ending at 2 am
		const regularUpdateJob = schedule.scheduleJob('0,15,30,45 0-1,19-23 * * *', async function (fireTime) {
			console.log('REGULAR UPDATES RAN AT:', fireTime);
			await OnlyLocksAPI.regularUpdate();
		});

		// Team season stats and player season stats will update once a day at 2 am
		const dailyUpdateJob = schedule.scheduleJob('0 2 * * *', async function (fireTime) {
			console.log('DAILY UPDATES RAN AT:', fireTime);
			await OnlyLocksAPI.dailyUpdate();
		});
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Navigation user={user} logoutUser={logoutUser} />
				<Routes>
					{/* Home */}
					<Route path="/" element={<Home updateUser={user} />} />

					{/* Register New User */}
					<Route path="/register" element={<RegisterForm updateUser={updateUser} />} />

					{/* Login User */}
					<Route path="/login" element={<LoginForm updateUser={updateUser} />} />

					{/* Protected Routes - Must Be Logged In */}
					<Route element={<PrivateRoutes />}>
						{/* View User Details */}
						<Route path="/users/:username" element={<User />} />

						{/* View Games By Date */}
						<Route path="/games" element={<GameList data={data} setData={setData} />} />
						{/* View Game Details */}
						<Route path="/games/:gameId" element={<GameDetails />} />
						{/* View All Team Stats */}
						<Route path="/teams/stats" element={<TeamStats />} />
						{/* View Team Details */}
						<Route path="/teams/:teamId" element={<TeamDetails categories={playerCategories} />} />
						{/* View Top Performing Players By Date */}
						<Route path="/players" element={<PlayerList data={data} setData={setData} />} />
						{/* View All Player Stats */}
						<Route path="/players/stats" element={<PlayerStats categories={playerCategories} />} />
						{/* View player details */}
						<Route path="/players/:playerId" element={<PlayerDetails categories={playerCategories} />} />
					</Route>
				</Routes>
				<NewPickButton />
			</BrowserRouter>
		</div>
	);
}

export default App;
