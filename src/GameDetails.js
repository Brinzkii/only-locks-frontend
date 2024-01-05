import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
	const [data, setData] = useState({
		game: undefined,
		gameStats: { home: undefined, away: undefined },
		teamStats: { home: undefined, away: undefined },
		gameTopPlayers: { home: undefined, away: undefined },
		seasonTopPlayers: { home: undefined, away: undefined },
	});
	let { gameId } = useParams();
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
							{!data.gameStats.home.points && !data.gameStats.away.points
								? Object.keys(data.teamStats.home).map((key, idx) => {
										if (idx > 6) {
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

				{!data.gameTopPlayers.home.points ? (
					<div className="GameDetails-top-performers mt-5">
						<h5 className="GameDetails-top-performers-header">Top Performers (23-24 Season Averages)</h5>
						<Table className="GameDetails-top-performers-table">
							<tbody>
								<tr key={uuid()}>
									<td>
										{data.seasonTopPlayers.home.points.name} (
										{Math.round(
											data.seasonTopPlayers.home.points.value /
												data.seasonTopPlayers.home.points.games
										)}
										)
									</td>
									<td>Points</td>
									<td>
										{data.seasonTopPlayers.away.points.name} (
										{Math.round(
											data.seasonTopPlayers.away.points.value /
												data.seasonTopPlayers.away.points.games
										)}
										)
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.seasonTopPlayers.home.totalReb.name} (
										{Math.round(
											data.seasonTopPlayers.home.totalReb.value /
												data.seasonTopPlayers.home.totalReb.games
										)}
										)
									</td>
									<td>Rebounds</td>
									<td>
										{data.seasonTopPlayers.away.totalReb.name} (
										{Math.round(
											data.seasonTopPlayers.away.totalReb.value /
												data.seasonTopPlayers.away.totalReb.games
										)}
										)
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.seasonTopPlayers.home.assists.name} (
										{Math.round(
											data.seasonTopPlayers.home.assists.value /
												data.seasonTopPlayers.home.assists.games
										)}
										)
									</td>
									<td>Assists</td>
									<td>
										{data.seasonTopPlayers.away.assists.name} (
										{Math.round(
											data.seasonTopPlayers.away.assists.value /
												data.seasonTopPlayers.away.assists.games
										)}
										)
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.seasonTopPlayers.home.blocks.name} (
										{Math.round(
											data.seasonTopPlayers.home.blocks.value /
												data.seasonTopPlayers.home.blocks.games
										)}
										)
									</td>
									<td>Blocks</td>
									<td>
										{data.seasonTopPlayers.away.blocks.name} (
										{Math.round(
											data.seasonTopPlayers.away.blocks.value /
												data.seasonTopPlayers.away.blocks.games
										)}
										)
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.seasonTopPlayers.home.steals.name} (
										{Math.round(
											data.seasonTopPlayers.home.steals.value /
												data.seasonTopPlayers.home.steals.games
										)}
										)
									</td>
									<td>Steals</td>
									<td>
										{data.seasonTopPlayers.away.steals.name} (
										{Math.round(
											data.seasonTopPlayers.away.steals.value /
												data.seasonTopPlayers.away.steals.games
										)}
										)
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.seasonTopPlayers.home.plusMinus.name} (
										{data.seasonTopPlayers.home.plusMinus.value > 0
											? `+${Math.round(
													data.seasonTopPlayers.home.plusMinus.value /
														data.seasonTopPlayers.home.plusMinus.games
											  )}`
											: Math.round(
													data.seasonTopPlayers.home.plusMinus.value /
														data.seasonTopPlayers.home.plusMinus.games
											  )}
										)
									</td>
									<td>Plus/Minus</td>
									<td>
										{data.seasonTopPlayers.away.plusMinus.name} (
										{data.seasonTopPlayers.away.plusMinus.value > 0
											? `+${Math.round(
													data.seasonTopPlayers.away.plusMinus.value /
														data.seasonTopPlayers.away.plusMinus.games
											  )}`
											: Math.round(
													data.seasonTopPlayers.away.plusMinus.value /
														data.seasonTopPlayers.away.plusMinus.games
											  )}
										)
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				) : (
					<div className="GameDetails-top-performers mt-5">
						<h5 className="GameDetails-top-performers-header">
							Top Performers ({Moment(data.game.date).format('LL')})
						</h5>
						<Table className="GameDetails-top-performers-table">
							<tbody>
								<tr key={uuid()}>
									<td>
										{data.gameTopPlayers.home.points.name} ({data.gameTopPlayers.home.points.value})
									</td>
									<td>Points</td>
									<td>
										{data.gameTopPlayers.away.points.name} ({data.gameTopPlayers.away.points.value})
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.gameTopPlayers.home.totalReb.name} (
										{data.gameTopPlayers.home.totalReb.value})
									</td>
									<td>Rebounds</td>
									<td>
										{data.gameTopPlayers.away.totalReb.name} (
										{data.gameTopPlayers.away.totalReb.value})
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.gameTopPlayers.home.assists.name} (
										{data.gameTopPlayers.home.assists.value})
									</td>
									<td>Assists</td>
									<td>
										{data.gameTopPlayers.away.assists.name} (
										{data.gameTopPlayers.away.assists.value})
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.gameTopPlayers.home.blocks.name} ({data.gameTopPlayers.home.blocks.value})
									</td>
									<td>Blocks</td>
									<td>
										{data.gameTopPlayers.away.blocks.name} ({data.gameTopPlayers.away.blocks.value})
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.gameTopPlayers.home.steals.name} ({data.gameTopPlayers.home.steals.value})
									</td>
									<td>Steals</td>
									<td>
										{data.gameTopPlayers.away.steals.name} ({data.gameTopPlayers.away.steals.value})
									</td>
								</tr>
								<tr key={uuid()}>
									<td>
										{data.gameTopPlayers.home.plusMinus.name} (
										{data.gameTopPlayers.home.plusMinus.value > 0
											? `+${data.gameTopPlayers.home.plusMinus.value}`
											: data.gameTopPlayers.home.plusMinus.value}
										)
									</td>
									<td>Plus/Minus</td>
									<td>
										{data.gameTopPlayers.away.plusMinus.name} (
										{data.gameTopPlayers.away.plusMinus.value > 0
											? `+${data.gameTopPlayers.away.plusMinus.value}`
											: data.gameTopPlayers.away.plusMinus.value}
										)
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				)}
			</div>
		);
	}
}

export default GameDetails;
