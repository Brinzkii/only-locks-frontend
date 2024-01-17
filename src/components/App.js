// import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Moment from 'moment';
import Navigation from './Navigation';
import Home from './Home';
import User from './user/User';
import GameList from './game/GameList';
import GameDetails from './game/GameDetails';
import TeamDetails from './team/TeamDetails';
import PlayerDetails from './player/PlayerDetails';
import PlayerStats from './player/PlayerStats';
import TeamStats from './team/TeamStats';
import PlayerList from './player/PlayerList';
import PickFormContainer from './picks/PickFormContainer';
import LoginForm from './user/LoginForm';
import RegisterForm from './user/RegisterForm';
import OnlyLocksAPI from '../api/OnlyLocksAPI';
import PrivateRoutes from './PrivateRoutes';
import '../styles/index.css';
import '../styles/App.css';

function App() {
	const [data, setData] = useState({
		teams: [],
		games: [],
		players: { points: [], tpm: [], assists: [], rebounds: [], blocks: [], steals: [] },
		playerList: [],
		standings: {},
		date: Moment(),
	});
	const [user, setUser] = useState({});

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
	const quarters = {
		1: '1st',
		2: '2nd',
		3: '3rd',
		4: '4th',
	};
	const standingsConversion = {
		1: '1st',
		2: '2nd',
		3: '3rd',
		4: '4th',
		5: '5th',
		6: '6th',
		7: '7th',
		8: '8th',
		9: '9th',
		10: '10th',
		11: '11th',
		12: '12th',
		13: '13th',
		14: '14th',
		15: '15th',
	};

	const updateUser = ({ username, token, picks, following }) => {
		async function getData() {
			if (username) localStorage.setItem('username', username);
			if (token) localStorage.setItem('token', token);
			if (picks) localStorage.setItem('picks', JSON.stringify(picks));
			if (following) localStorage.setItem('following', JSON.stringify(following));
			setUser({ ...user, username, token });
			const teams = await OnlyLocksAPI.allTeams();
			const playerList = await OnlyLocksAPI.allPlayers();
			setData({ ...data, teams, playerList });
		}

		getData();
	};
	const logoutUser = () => {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		localStorage.setItem('picks', JSON.stringify([]));
		localStorage.setItem('following', JSON.stringify([]));
		setUser(undefined);
		notifySuccess('You have been logged out!');
	};
	const notifySuccess = (msg) => toast.success(`${msg}`);
	const notifyError = (msg) => toast.error(`${msg}`);

	useEffect(() => {
		async function checkForUser() {
			if (localStorage.token) {
				let user = await OnlyLocksAPI.getUser(localStorage.username);
				const info = {
					username: user.username,
					token: localStorage.token,
					picks: user.picks.playerPicks.concat(user.picks.teamPicks),
					following: { teams: user.followedTeams, players: user.followedPlayers },
				};
				localStorage.setItem('username', info.username);
				localStorage.setItem('picks', JSON.stringify(info.picks));
				localStorage.setItem('following', JSON.stringify(user.following));
				setUser(info);
				console.log('USER:', info);

				let teams = await OnlyLocksAPI.allTeams();
				const today = Moment().format('YYYYMMDD');
				let games = await OnlyLocksAPI.gamesByDate(today);
				const playerList = await OnlyLocksAPI.allPlayers();
				const standings = await OnlyLocksAPI.conferenceStandings();
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

				console.log({ teams, games, players, playerList, standings });
				setData({ teams, games, players, playerList, standings });
			}
		}
		checkForUser();
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Navigation user={user} logoutUser={logoutUser} players={data.playerList} teams={data.teams} />
				<Routes>
					{/* Home */}
					<Route path="/" element={<Home standings={data.standings} />} />

					{/* Register New User */}
					<Route
						path="/register"
						element={
							<RegisterForm
								updateUser={updateUser}
								notifySuccess={notifySuccess}
								notifyError={notifyError}
							/>
						}
					/>

					{/* Login User */}
					<Route
						path="/login"
						element={
							<LoginForm
								updateUser={updateUser}
								notifySuccess={notifySuccess}
								notifyError={notifyError}
							/>
						}
					/>

					{/* Protected Routes - Must Be Logged In */}
					<Route element={<PrivateRoutes />}>
						{/* View User Details */}
						<Route path="/users/:username" element={<User quarters={quarters} />} />

						{/* View Games By Date */}
						<Route path="/games" element={<GameList data={data} setData={setData} quarters={quarters} />} />
						{/* View Game Details */}
						<Route path="/games/:gameId" element={<GameDetails quarters={quarters} />} />
						{/* View All Team Stats */}
						<Route path="/teams/stats" element={<TeamStats />} />
						{/* View Team Details */}
						<Route
							path="/teams/:teamId"
							element={
								<TeamDetails
									categories={playerCategories}
									conversion={standingsConversion}
									user={user}
									notifySuccess={notifySuccess}
									notifyError={notifyError}
								/>
							}
						/>
						{/* View Top Performing Players By Date */}
						<Route path="/players" element={<PlayerList data={data} setData={setData} />} />
						{/* View All Player Stats */}
						<Route path="/players/stats" element={<PlayerStats categories={playerCategories} />} />
						{/* View player details */}
						<Route
							path="/players/:playerId"
							element={
								<PlayerDetails
									categories={playerCategories}
									user={user}
									notifySuccess={notifySuccess}
									notifyError={notifyError}
								/>
							}
						/>
					</Route>
				</Routes>
				{localStorage.token ? (
					<PickFormContainer notifySuccess={notifySuccess} notifyError={notifyError} />
				) : (
					<></>
				)}
				<Toaster toastOptions={{ success: { duration: 5000 }, error: { duration: 10000 } }} />
			</BrowserRouter>
		</div>
	);
}

export default App;
