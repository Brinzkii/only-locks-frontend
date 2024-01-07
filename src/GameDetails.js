import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import TeamComparisonTable from './TeamComparisonTable';
import TeamH2HTable from './TeamH2HTable';
import TopPerformersTable from './TopPerformersTable';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
import './GameDetails.css';

function GameDetails({ categories }) {
	const INITIAL_STATE = {
		game: undefined,
		gameStats: { home: undefined, away: undefined },
		teamStats: { home: undefined, away: undefined },
		gameTopPlayers: { home: undefined, away: undefined },
		seasonTopPlayers: { home: undefined, away: undefined },
		h2h: { totals: undefined, games: undefined, gameStats: undefined },
	};
	const navigate = useNavigate();
	const [data, setData] = useState(INITIAL_STATE);
	let { gameId } = useParams();
	const handlePlayerClick = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	useEffect(() => {
		async function getData(gameId) {
			const game = await OnlyLocksAPI.game(gameId);
			const gameStats = await OnlyLocksAPI.teamGameStats(gameId);
			const homeTeamStats = await OnlyLocksAPI.teamStats(game.homeId);
			const awayTeamStats = await OnlyLocksAPI.teamStats(game.awayId);
			const topGamePerformers = await OnlyLocksAPI.gameTopPerformers(gameId);
			const homeSeasonPerformers = await OnlyLocksAPI.seasonTopPerformers(game.homeId);
			const awaySeasonPerformers = await OnlyLocksAPI.seasonTopPerformers(game.awayId);
			const h2h = await OnlyLocksAPI.h2h(game.homeId, game.awayId);
			setData({
				game,
				gameStats: {
					home: gameStats.home,
					away: gameStats.away,
				},
				teamStats: {
					home: homeTeamStats,
					away: awayTeamStats,
				},
				gameTopPlayers: {
					home: topGamePerformers.home,
					away: topGamePerformers.away,
				},
				seasonTopPlayers: {
					home: homeSeasonPerformers,
					away: awaySeasonPerformers,
				},
				h2h,
			});
			console.log({
				game,
				gameStats: {
					home: gameStats.home,
					away: gameStats.away,
				},
				teamStats: {
					home: homeTeamStats,
					away: awayTeamStats,
				},
				gameTopPlayers: {
					home: topGamePerformers.home,
					away: topGamePerformers.away,
				},
				seasonTopPlayers: {
					home: homeSeasonPerformers,
					away: awaySeasonPerformers,
				},
				h2h,
			});
		}
		getData(gameId);
	}, [gameId]);
	if (data.game === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="GameDetails mt-4">
				<h2 className="GameDetails-header">
					{data.game.homeName} vs. {data.game.awayName}
				</h2>
				<h4 className="GameDetails-location">{data.game.location}</h4>
				{!data.game.clock ? (
					<h4>{Moment(data.game.date).format('LLL')}</h4>
				) : (
					<>
						<h4 className="GameDetails-clock">{data.game.clock}</h4>
						<h4 className="GameDetails-score">
							<small>{data.game.homeCode}</small> {data.game.score} <small>{data.game.awayCode}</small>
						</h4>
					</>
				)}
				<div className="GameDetails-matchup">
					{!data.gameStats.home && !data.gameStats.away ? (
						<TeamComparisonTable game={data.game} teamStats={data.teamStats} categories={categories} />
					) : (
						<TeamComparisonTable
							game={data.game}
							gameStats={data.gameStats}
							teamStats={data.teamStats}
							categories={categories}
						/>
					)}
				</div>

				{/* Head to Head comparison for team if they've played this season */}
				{data.h2h.gameStats.length ? (
					<div className="GameDetails-h2h mt-5">
						<TeamH2HTable game={data.game} h2h={data.h2h} categories={categories} />
					</div>
				) : (
					<></>
				)}

				{/* Show game top performers if game has taken place, otherwise show season top performers */}
				{Object.keys(data.gameTopPlayers.home).length === 0 ? (
					<div className="GameDetails-top-performers mt-5">
						<h5 className="GameDetails-top-performers-header">Top Performers (23-24 Season Averages)</h5>
						<TopPerformersTable
							seasonTopPlayers={data.seasonTopPlayers}
							handlePlayerClick={handlePlayerClick}
							categories={categories}
						/>
					</div>
				) : (
					<div className="GameDetails-top-performers mt-5">
						<h5 className="GameDetails-top-performers-header">Top Performers</h5>
						<TopPerformersTable
							seasonTopPlayers={data.seasonTopPlayers}
							gameTopPlayers={data.gameTopPlayers}
							handlePlayerClick={handlePlayerClick}
							categories={categories}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default GameDetails;
