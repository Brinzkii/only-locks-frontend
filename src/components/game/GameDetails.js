import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import TeamComparisonTable from '../team/TeamComparisonTable';
import GamePicks from './GamePicks';
import TeamH2HTable from '../team/TeamH2HTable';
import TeamTopPerformersTable from '../team/TeamTopPerformersTable';
import PlayerGameStatsTable from '../player/PlayerGameStatsTable';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';
import Loading from '../Loading';
import '../../styles/game/GameDetails.css';

function GameDetails({ quarters }) {
	const INITIAL_STATE = {
		game: undefined,
		gameStats: { home: undefined, away: undefined },
		playerGameStats: {},
		teamStats: { home: undefined, away: undefined },
		gameTopPlayers: { home: undefined, away: undefined },
		seasonTopPlayers: { home: undefined, away: undefined },
		h2h: { totals: undefined, games: undefined, gameStats: undefined },
		picks: [],
	};
	const [key, setKey] = useState('matchup');
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
			const picks = await OnlyLocksAPI.gamePicks(game.id);
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
				picks,
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
				playerGameStats,
				picks,
			});
		}
		getData(gameId);
	}, [gameId]);
	if (data.game === undefined) {
		return <Loading size="100px" />;
	} else {
		return (
			<div className="game-details mt-4 mx-auto text-center">
				<h2 className="game-details-header">
					{data.game.homeName.toUpperCase()} vs {data.game.awayName.toUpperCase()}
				</h2>
				<h4 className="game-details-location">{data.game.location}</h4>
				{data.game.status === 'scheduled' ? (
					<h4>{Moment(data.game.date).format('LLL')}</h4>
				) : (
					<>
						<h4>{data.game.status === 'scheduled' ? Moment(data.game.date).format('LLL') : null}</h4>
						<h4 className="game-details-clock mb-0">
							<Stack direction="vertical">
								{data.game.clock ? (
									<Stack className="mx-auto" gap={2} direction="horizontal">
										<div>{data.game.clock}</div>
										<small>{quarters[data.game.quarter]} Qtr</small>
									</Stack>
								) : (
									<div>Final</div>
								)}
							</Stack>
						</h4>
						<h4 className="game-details-score mt-0">
							<small>{data.game.homeCode}</small> {data.game.score} <small>{data.game.awayCode}</small>
						</h4>
					</>
				)}

				<Tabs
					id="game-details-tabs"
					justify
					activeKey={key}
					onSelect={(k) => setKey(k)}
					className="mx-auto mt-3"
				>
					<Tab eventKey="matchup" title="Matchup">
						<div className="game-details-matchup">
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
					</Tab>
					{data.h2h.gameStats.length && !data.gameStats.home && !data.gameStats.away ? (
						<Tab eventKey="h2h" title="Head 2 Head">
							<div className="game-details-h2h">
								<TeamH2HTable
									game={data.game}
									h2h={data.h2h}
									categories={categories}
									navToTeam={navToTeam}
								/>
							</div>
						</Tab>
					) : null}
					<Tab
						eventKey="top"
						title={
							Object.keys(data.gameTopPlayers.home).length ? 'Top Performers' : 'Top Performers (season)'
						}
					>
						{Object.keys(data.gameTopPlayers.home).length === 0 ? (
							<div className="game-details-top-performers mt-5">
								<TeamTopPerformersTable
									seasonTopPlayers={data.seasonTopPlayers}
									navToPlayer={navToPlayer}
									categories={categories}
								/>
							</div>
						) : (
							<div className="game-details-top-performers mt-5">
								<TeamTopPerformersTable
									seasonTopPlayers={data.seasonTopPlayers}
									gameTopPlayers={data.gameTopPlayers}
									navToPlayer={navToPlayer}
									categories={categories}
								/>
							</div>
						)}
					</Tab>
					{data.playerGameStats.length ? (
						<Tab eventKey="boxscore" title="Box Score">
							<div className="game-details-player-game-stats-table mt-4">
								<PlayerGameStatsTable
									gameStats={data.playerGameStats}
									navToPlayer={navToPlayer}
									handleCategoryClick={handleCategoryClick}
								/>
							</div>
						</Tab>
					) : null}
				</Tabs>

				{/* All picks placed for current game */}
				{data.picks.picks.length ? (
					<div className="game-details-picks mb-3">
						<GamePicks picks={data.picks} quarters={quarters} navToPlayer={navToPlayer} />
					</div>
				) : null}
			</div>
		);
	}
}

export default GameDetails;
