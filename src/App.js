import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import User from './User';
import GameList from './GameList';
import GameDetails from './GameDetails';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OnlyLocksAPI from './OnlyLocksAPI';
import PrivateRoutes from './PrivateRoutes';
import Moment from 'moment';
import './App.css';

function App() {
	const [teams, setTeams] = useState([]);
	const [players, setPlayers] = useState([]);
	const [user, setUser] = useState([]);
	const updateUser = ({ username, token, picks, following }) => {
		async function getData() {
			let teams = await OnlyLocksAPI.allTeams();
			setTeams(teams);

			let players = await OnlyLocksAPI.allPlayers();
			setPlayers(players);
		}
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
				updateUser({
					username: localStorage.username,
					token: localStorage.token,
					picks: user.picks.playerPicks.concat(user.picks.teamPicks),
					following: user.followedTeams.concat(user.followedPlayers),
				});
			}
		}
		checkForUser();
	}, []);
	console.log(games);

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
						<Route path="/games" element={<GameList games={games} setGames={setGames} />} />
						{/* View Game Details */}
						<Route path="/games/:gameId" element={<GameDetails />} />
						{/* View All Teams */}

						{/* View Team Details */}

						{/* View all players */}

						{/* View player details */}
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
