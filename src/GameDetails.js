import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
import './GameDetails.css';

function GameDetails() {
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
	const INITIAL_STATE = {
		game: undefined,
		gameStats: { home: undefined, away: undefined },
		teamStats: { home: undefined, away: undefined },
		gameTopPlayers: { home: undefined, away: undefined },
		seasonTopPlayers: { home: undefined, away: undefined },
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
				<h5 className="GameDetails-date">{Moment(data.game.date).format('LL')}</h5>
				{!data.game.clock ? <></> : <h4 className="GameDetails-clock">{data.game.clock}</h4>}
				{!data.game.score ? (
					<h4>TBD</h4>
				) : (
					<h4 className="GameDetails-score">
						<small>{data.game.homeCode}</small> {data.game.score} <small>{data.game.awayCode}</small>
					</h4>
				)}
				<div className="GameDetails-matchup">
					<Table className="GameDetails-matchup-stats-table" size="sm" striped bordered hover>
						<thead>
							<tr>
								<th>
									<Stack>
										<Link to={`/teams/${data.game.homeId}`}>
											<Image className="GameDetails-matchup-logo" src={data.game.homeLogo} />
										</Link>
										<h5>
											<small>
												({data.teamStats.home.wins}-{data.teamStats.home.losses})
											</small>
										</h5>
									</Stack>
								</th>
								<th>
									<small>stat (per game)</small>
								</th>
								<th>
									<Stack>
										<Link to={`/teams/${data.game.awayId}`}>
											<Image className="GameDetails-matchup-logo" src={data.game.awayLogo} />
										</Link>

										<h5>
											<small>
												({data.teamStats.away.wins}-{data.teamStats.away.losses})
											</small>
										</h5>
									</Stack>
								</th>
							</tr>
						</thead>
						<tbody>
							{!data.gameStats.home && !data.gameStats.away
								? Object.keys(data.teamStats.home).map((key, idx) => {
										if (idx > 8) {
											return (
												<tr key={uuid()}>
													<td>
														{key === 'fgp' || key === 'ftp' || key === 'tpp'
															? data.teamStats.home[key]
															: Math.round(
																	data.teamStats.home[key] / data.teamStats.home.games
															  )}
													</td>
													<td>{categories[key] || key}</td>
													<td>
														{key === 'fgp' || key === 'ftp' || key === 'tpp'
															? data.teamStats.away[key]
															: Math.round(
																	data.teamStats.away[key] / data.teamStats.away.games
															  )}
													</td>
												</tr>
											);
										}
								  })
								: Object.keys(data.gameStats.home).map((key, idx) => {
										if (idx > 5) {
											return (
												<tr key={uuid()}>
													<td>{data.gameStats.home[key]}</td>
													<td>{categories[key]}</td>
													<td>{data.gameStats.away[key]}</td>
												</tr>
											);
										}
								  })}
						</tbody>
					</Table>
				</div>
				{/* If game top performers is empty, loop over season top performers */}
				{Object.keys(data.gameTopPlayers.home).length === 0 ? (
					<div className="GameDetails-top-performers mt-5">
						<h5 className="GameDetails-top-performers-header">Top Performers (23-24 Season Averages)</h5>
						<Table className="GameDetails-top-performers-table">
							<tbody>
								{Object.keys(data.seasonTopPlayers.home).map((key) => {
									if (key !== 'team') {
										return (
											<tr key={uuid()}>
												<td id={data.seasonTopPlayers.home[key].id} onClick={handlePlayerClick}>
													{data.seasonTopPlayers.home[key].name} (
													{key === 'plusMinus' ? (
														<>
															`+$
															{Math.round(
																data.seasonTopPlayers.home[key].value /
																	data.seasonTopPlayers.home[key].games
															)}
															`
														</>
													) : (
														<>
															{Math.round(
																data.seasonTopPlayers.home[key].value /
																	data.seasonTopPlayers.home[key].games
															)}
														</>
													)}
												</td>

												<td>{categories[key]}</td>
												<td id={data.seasonTopPlayers.away[key].id} onClick={handlePlayerClick}>
													{data.seasonTopPlayers.away[key].name} (
													{key === 'plusMinus'
														? `+${Math.round(
																data.seasonTopPlayers.away[key].value /
																	data.seasonTopPlayers.away[key].games
														  )}`
														: Math.round(
																data.seasonTopPlayers.away[key].value /
																	data.seasonTopPlayers.away[key].games
														  )}
													)
												</td>
											</tr>
										);
									}
								})}
							</tbody>
						</Table>
					</div>
				) : (
					<div className="GameDetails-top-performers mt-5">
						<h5 className="GameDetails-top-performers-header">Top Performers</h5>
						<Table striped className="GameDetails-top-performers-table">
							<tbody>
								{Object.keys(data.gameTopPlayers.home).map((key) => {
									if (key !== 'team') {
										return (
											<tr key={uuid()}>
												<td id={data.gameTopPlayers.home[key].id} onClick={handlePlayerClick}>
													{data.gameTopPlayers.home[key].name} (
													{key === 'plusMinus'
														? `+${Math.round(data.gameTopPlayers.home[key].value)}`
														: Math.round(data.gameTopPlayers.home[key].value)}
													)
												</td>
												<td>{categories[key]}</td>
												<td id={data.gameTopPlayers.away[key].id} onClick={handlePlayerClick}>
													{data.gameTopPlayers.away[key].name} (
													{key === 'plusMinus'
														? `+${Math.round(data.gameTopPlayers.away[key].value)}`
														: Math.round(data.gameTopPlayers.away[key].value)}
													)
												</td>
											</tr>
										);
									}
								})}
							</tbody>
						</Table>
					</div>
				)}
			</div>
		);
	}
}

export default GameDetails;
