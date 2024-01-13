import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import PlayerInfoCard from './PlayerInfoCard';
import PlayerSeasonStatsTable from './PlayerSeasonStatsTable';
import PlayerGameStatsTable from './PlayerGameStatsTable';
import Spinner from 'react-bootstrap/Spinner';

function PlayerDetails({ categories }) {
	const INITIAL_STATE = {
		player: undefined,
		team: undefined,
		games: undefined,
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
	function handleCategoryClick(stat) {
		async function sortGameStats(stat) {
			setData({ ...data, gameStats: undefined });
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
			};
			stat = conversions[stat] || stat;
			const gameStats = await OnlyLocksAPI.sortPlayerStats({ stat, time: 'all games', playerId: data.player.id });

			setData({ ...data, gameStats });
		}
		sortGameStats(stat);
	}

	useEffect(() => {
		async function getData(playerId) {
			const player = await OnlyLocksAPI.player(playerId);
			const seasonStats = await OnlyLocksAPI.playerSeasonStats(playerId);
			const gameStats = await OnlyLocksAPI.allPlayerGameStats(playerId);
			const games = await OnlyLocksAPI.teamGames(player.teamId);
			setData({ player, team: player.team, seasonStats, gameStats: gameStats.reverse(), games });
			console.log({ player, team: player.team, games, seasonStats, gameStats });
		}
		getData(playerId);
	}, [playerId]);
	if (data.player === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="PlayerDetails mt-4">
				<h2>{data.player.name}</h2>
				<PlayerInfoCard player={data.player} team={data.team} navToTeam={navToTeam} />
				<h4 className="mt-2">Season Stats</h4>
				<PlayerSeasonStatsTable stats={data.seasonStats} categories={categories} />
				<h4>Game Stats</h4>
				<PlayerGameStatsTable
					gameStats={data.gameStats}
					games={data.games}
					navToGame={navToGame}
					player={data.player}
					handleCategoryClick={handleCategoryClick}
				/>
			</div>
		);
	}
}

export default PlayerDetails;
