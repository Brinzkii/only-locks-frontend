import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OnlyLocksAPI from './OnlyLocksAPI';

function PlayerDetails() {
	const INITIAL_STATE = {
		player: undefined,
		team: undefined,
		seasonStats: undefined,
		gameStats: undefined,
	};
	const [data, setData] = useState(INITIAL_STATE);
	const { playerId } = useParams();
	const navigate = useNavigate();
	const navToGame = (evt) => {
		navigate(`/games/${evt.target.id}`);
	};
	const navToTeam = (evt) => {
		navigate(`/teams/${evt.target.id}`);
	};
	useEffect(() => {
		async function getData(playerId) {
			const player = await OnlyLocksAPI.player(playerId);
			console.log('PLAYER:', player);
			const seasonStats = await OnlyLocksAPI.playerSeasonStats(playerId);
			// const gameStats = await OnlyLocksAPI.allPlayerGameStats(playerId);
			setData({ player, team: player.team, seasonStats });
			console.log({ player, team: player.team, seasonStats });
		}
		getData(playerId);
	}, [playerId]);
	return (
		<div className="PlayerDetails">
			<h2>Player Details</h2>
		</div>
	);
}

export default PlayerDetails;
