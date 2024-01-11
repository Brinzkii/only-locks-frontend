import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import TeamComparisonTable from './TeamComparisonTable';
import TeamH2HTable from './TeamH2HTable';
import TeamTopPerformersTable from './TeamTopPerformersTable';
import PlayerGameStatsTable from './PlayerGameStatsTable';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import './GameDetails.css';

function GameDetails({ quarters }) {
	const INITIAL_STATE = {
		game: undefined,
		gameStats: { home: undefined, away: undefined },
		playerGameStats: {},
		teamStats: { home: undefined, away: undefined },
		gameTopPlayers: { home: undefined, away: undefined },
		seasonTopPlayers: { home: undefined, away: undefined },
		h2h: { totals: undefined, games: undefined, gameStats: undefined },
	};
	const categories = {
		points: 'Points',
		fgm: 'Field Goals Made',
		fga: 'Field Goal Attempts',
		fgp: 'Field Goal %',
		ftm: 'Free Throws Made',
		fta: 'Free Throw Attempts',
		ftp: 'Free Throw %',
		tpm: 'Three Pointers Made',
		tpa: 'Three Point Attempts',
		tpp: 'Three Point %',
		offReb: 'Offensive Rebounds',
		defReb: 'Defensive Rebounds',
		totalReb: 'Rebounds',
		assists: 'Assists',
		fouls: 'Fouls',
		steals: 'Steals',
		turnovers: 'Turnovers',
		blocks: 'Blocks',
		plusMinus: 'Plus/Minus',
	};
	const [data, setData] = useState(INITIAL_STATE);
	const { gameId } = useParams();
	const navigate = useNavigate();
	const navToTeam = (evt) => {
		navigate(`/teams/${evt.target.id}`);
	};
	const navToPlayer = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	function handleCategoryClick(stat) {
		async function sortGameStats(stat) {
			setData({ ...data, playerGameStats: undefined });
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
			};
			stat = conversions[stat] || stat;
			const playerGameStats = await OnlyLocksAPI.sortPlayerStats({
				stat,
				time: 'all games',
				gameId: data.game.id,
			});

			setData({ ...data, playerGameStats });
		}
		sortGameStats(stat);
	}

	useEffect(() => {
		async function getData(gameId) {
			const game = await OnlyLocksAPI.game(gameId);
			const gameStats = await OnlyLocksAPI.teamGameStats(gameId);
			const playerGameStats = await OnlyLocksAPI.sortPlayerStats({ time: 'all games', gameId: game.id });
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
				playerGameStats,
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
			<div className="GameDetails mt-4 text-center">
				<h2 className="GameDetails-header">
					{data.game.homeName} vs. {data.game.awayName}
				</h2>
				<h4 className="GameDetails-location">{data.game.location}</h4>
				{data.game.status === 'scheduled' ? (
					<h4>{Moment(data.game.date).format('LLL')}</h4>
				) : (
					<>
						<h4>{Moment(data.game.date).format('LLL')}</h4>
						<h4 className="GameDetails-clock mb-0">
							<Stack direction="vertical">
								{data.game.clock ? (
									<>
										<small>{quarters[data.game.quarter]}</small>
										<div>{data.game.clock}</div>
									</>
								) : (
									<div>Final</div>
								)}
							</Stack>
						</h4>
						<h4 className="GameDetails-score mt-0">
							<small>{data.game.homeCode}</small> {data.game.score} <small>{data.game.awayCode}</small>
						</h4>
					</>
				)}
				<div className="GameDetails-matchup">
					{!data.gameStats.home && !data.gameStats.away ? (
						<TeamComparisonTable
							title="stat (per game)"
							game={data.game}
							teamStats={data.teamStats}
							categories={categories}
							navToTeam={navToTeam}
						/>
					) : (
						<TeamComparisonTable
							title="stat"
							game={data.game}
							gameStats={data.gameStats}
							teamStats={data.teamStats}
							categories={categories}
							navToTeam={navToTeam}
						/>
					)}
				</div>

				{/* Head to Head comparison for team if they've played this season */}
				{data.h2h.gameStats.length && !data.gameStats.home && !data.gameStats.away ? (
					<div className="GameDetails-h2h mt-5">
						<TeamH2HTable game={data.game} h2h={data.h2h} categories={categories} navToTeam={navToTeam} />
					</div>
				) : (
					<></>
				)}

				{/* Show game top performers if game has taken place, otherwise show season top performers */}
				{Object.keys(data.gameTopPlayers.home).length === 0 ? (
					<div className="GameDetails-top-performers mt-5">
						<h5 className="GameDetails-top-performers-header">Top Performers (23-24 Season Averages)</h5>
						<TeamTopPerformersTable
							seasonTopPlayers={data.seasonTopPlayers}
							navToPlayer={navToPlayer}
							categories={categories}
						/>
					</div>
				) : (
					<>
						<div className="GameDetails-top-performers mt-5">
							<h5 className="GameDetails-top-performers-header">Top Performers</h5>
							<TeamTopPerformersTable
								seasonTopPlayers={data.seasonTopPlayers}
								gameTopPlayers={data.gameTopPlayers}
								navToPlayer={navToPlayer}
								categories={categories}
							/>
						</div>
						<div className="GameDetails-player-game-stats-table mt-4">
							<h4>Box Score</h4>
							<PlayerGameStatsTable
								gameStats={data.playerGameStats}
								navToPlayer={navToPlayer}
								handleCategoryClick={handleCategoryClick}
							/>
						</div>
					</>
				)}
			</div>
		);
	}
}

export default GameDetails;
