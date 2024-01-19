import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import PlayerInfoCard from './PlayerInfoCard';
import PlayerSeasonStatsTable from './PlayerSeasonStatsTable';
import PlayerGameStatsTable from './PlayerGameStatsTable';
import Loading from '../Loading';
import '../../styles/player/PlayerDetails.css';

function PlayerDetails({ categories, user, notifySuccess, notifyError }) {
	const INITIAL_STATE = {
		player: undefined,
		team: undefined,
		games: undefined,
		seasonStats: undefined,
		gameStats: undefined,
		activeSort: undefined,
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
			setData({ ...data, activeSort: stat, gameStats: undefined });
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
			};
			const cleanStat = conversions[stat] || stat;
			const gameStats = await OnlyLocksAPI.sortPlayerStats({
				stat: cleanStat,
				time: 'all games',
				playerId: data.player.id,
			});

			setData({ ...data, activeSort: stat, gameStats });
		}
		sortGameStats(stat);
	}

	useEffect(() => {
		async function getData(playerId) {
			const player = await OnlyLocksAPI.player(playerId);
			const seasonStats = await OnlyLocksAPI.playerSeasonStats(playerId);
			const gameStats = await OnlyLocksAPI.allPlayerGameStats(playerId);
			const games = await OnlyLocksAPI.teamGames(player.teamId);
			setData({
				player,
				team: player.team,
				seasonStats,
				gameStats: gameStats.reverse(),
				games,
				activeSort: undefined,
			});
		}
		getData(playerId);
	}, [playerId]);
	if (data.player === undefined) {
		return <Loading size="100px" />;
	} else {
		return (
			<div className="player-details mt-3 mx-auto text-center">
				<PlayerInfoCard
					player={data.player}
					team={data.team}
					navToTeam={navToTeam}
					user={user}
					notifySuccess={notifySuccess}
					notifyError={notifyError}
				/>
				<h4 className="mt-4 mb-0">Season Stats</h4>
				<div className="player-details-season-stats-container">
					<PlayerSeasonStatsTable stats={data.seasonStats} categories={categories} />
				</div>
				<h4 className="mt-5 mb-1">Game Stats</h4>
				<div className="player-details-game-stats-container mb-3">
					<PlayerGameStatsTable
						gameStats={data.gameStats}
						games={data.games}
						navToGame={navToGame}
						player={data.player}
						handleCategoryClick={handleCategoryClick}
						activeSort={data.activeSort}
					/>
				</div>
			</div>
		);
	}
}

export default PlayerDetails;
