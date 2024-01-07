import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import uuid from 'react-uuid';
import './TeamDetails.css';

function TeamDetails({ categories }) {
	const { teamId } = useParams();
	const navigate = useNavigate();
	const INITIAL_STATE = {
		team: undefined,
		recentGames: undefined,
		nextGames: undefined,
		players: undefined,
		teamStats: undefined,
		playerStats: undefined,
	};
	const [data, setData] = useState(INITIAL_STATE);
	const handleCategoryClick = (evt) => {
		async function sortPlayers(teamId, stat) {
			setData({ ...data, playerStats: undefined });
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
			};
			stat = conversions[stat] || stat;
			const playerStats = await OnlyLocksAPI.sortPlayerStats({ teamId, stat });

			setData({ ...data, playerStats });
		}
		sortPlayers(data.team.id, evt.target.id);
	};
	const handlePerGameClick = async () => {
		setData({ ...data, playerStats: undefined });
		const baseStats = await OnlyLocksAPI.sortPlayerStats({ teamId: data.team.id });
		const playerStats = baseStats.map((p) => {
			return {
				name: p.name,
				assists: p.assists / p.gp || 0,
				blocks: p.blocks / p.gp || 0,
				defReb: p.defReb / p.gp || 0,
				fga: p.fga / p.gp || 0,
				fgm: p.fgm / p.gp || 0,
				fgp: p.fgp / p.gp || 0,
				fouls: p.fouls / p.gp || 0,
				fta: p.fta / p.gp || 0,
				ftm: p.ftm / p.gp || 0,
				ftp: p.ftp / p.gp || 0,
				gp: p.gp || 0,
				id: p.id || 0,
				minutes: p.minutes / p.gp || 0,
				offReb: p.offReb / p.gp || 0,
				plusMinus: p.plusMinus / p.gp || 0,
				points: p.points / p.gp || 0,
				steals: p.steals / p.gp || 0,
				totalReb: p.totalReb / p.gp || 0,
				tpa: p.tpa / p.gp || 0,
				tpm: p.tpm / p.gp || 0,
				tpp: p.tpp / p.gp || 0,
				turnovers: p.turnovers / p.gp || 0,
			};
		});
		setData({ ...data, playerStats });
	};
	const handlePer36Click = async () => {
		setData({ ...data, playerStats: undefined });
		const baseStats = await OnlyLocksAPI.sortPlayerStats({ teamId: data.team.id });
		const playerStats = baseStats.map((p) => {
			setData({ ...data, playerStats: undefined });
			return {
				name: p.name,
				assists: (p.assists / p.minutes) * 36 || 0,
				blocks: (p.blocks / p.minutes) * 36 || 0,
				defReb: (p.defReb / p.minutes) * 36 || 0,
				fga: (p.fga / p.minutes) * 36 || 0,
				fgm: (p.fgm / p.minutes) * 36 || 0,
				fgp: (p.fgp / p.minutes) * 36 || 0,
				fouls: (p.fouls / p.minutes) * 36 || 0,
				fta: (p.fta / p.minutes) * 36 || 0,
				ftm: (p.ftm / p.minutes) * 36 || 0,
				ftp: (p.ftp / p.minutes) * 36 || 0,
				gp: p.gp,
				id: p.id,
				minutes: p.minutes,
				offReb: (p.offReb / p.minutes) * 36 || 0,
				plusMinus: (p.plusMinus / p.minutes) * 36 || 0,
				points: (p.points / p.minutes) * 36 || 0,
				steals: (p.steals / p.minutes) * 36 || 0,
				totalReb: (p.totalReb / p.minutes) * 36 || 0,
				tpa: (p.tpa / p.minutes) * 36 || 0,
				tpm: Math.round((p.tpm / p.minutes) * 36) || 0,
				tpp: (p.tpp / p.minutes) * 36 || 0,
				turnovers: (p.turnovers / p.minutes) * 36 || 0,
			};
		});
		setData({ ...data, playerStats });
	};
	const handleTotalClick = async () => {
		setData({ ...data, playerStats: undefined });
		const playerStats = await OnlyLocksAPI.sortPlayerStats({ teamId: data.team.id });
		setData({ ...data, playerStats });
	};
	const handlePlayerClick = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	useEffect(() => {
		async function getData(teamId) {
			const team = await OnlyLocksAPI.team(teamId);
			const teamStats = await OnlyLocksAPI.teamStats(teamId);
			const players = await OnlyLocksAPI.teamPlayers(teamId);
			const playerStats = await OnlyLocksAPI.sortPlayerStats({ teamId });
			const games = await OnlyLocksAPI.teamGames(teamId);

			function findCloseGames(date = Moment()) {
				let foundNext = false;
				let idx = 0;
				while (!foundNext) {
					if (Moment(games[idx].date) >= date) {
						foundNext = true;
					} else {
						idx++;
					}
				}
				console.log('GAMES:', games);
				console.log('IDX:', idx);
				console.log('NEXT GAME:', games[idx]);
				console.log('MOST RECENT', games[idx - 1]);
				let recentGames = [games[idx - 1], games[idx - 2], games[idx - 3], games[idx - 4], games[idx - 5]];

				let nextGames = [games[idx], games[idx + 1], games[idx + 2], games[idx + 3], games[idx + 4]];

				return { recentGames, nextGames };
			}

			const { recentGames, nextGames } = findCloseGames();

			// function findCloseGames(games, date=Moment().format('l')) {

			// }

			setData({ team, teamStats, players, playerStats, recentGames, nextGames });
			console.log({ team, teamStats, players, playerStats, recentGames, nextGames });
		}
		getData(teamId);
	}, [teamId]);

	if (data.team === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="TeamDetails mt-4">
				<div className="TeamDetails-header">
					<Image className="TeamDetails-logo" src={data.team.logo} />
					<h2 className="TeamDetails-name">
						{data.team.name} ({data.teamStats.wins}-{data.teamStats.losses})
					</h2>
					<h5>
						{data.team.conference}ern Conference&emsp;|&emsp;{data.team.division} Division
					</h5>
				</div>

				<div className="TeamDetails-player-stats mt-4">
					<h5>Roster</h5>
					<Table className="TeamDetails-player-stats-table" size="sm">
						<thead>
							<tr key={uuid()}>
								<th>
									<Button className="TeamDetails-stat-sort-button" onClick={handlePer36Click}>
										per36
									</Button>
									<Button className="TeamDetails-stat-sort-button" onClick={handlePerGameClick}>
										perGame
									</Button>
									<Button className="TeamDetails-stat-sort-button" onClick={handleTotalClick}>
										Total
									</Button>
								</th>
								{Object.keys(categories).map((key) => {
									if (key !== 'id' || key !== 'name') {
										return (
											<th id={key} onClick={handleCategoryClick}>
												{categories[key]}
											</th>
										);
									}
								})}
							</tr>
						</thead>
						{!data.playerStats ? (
							<Spinner className="table-spinner" animation="border" variant="info" />
						) : (
							<tbody>
								{data.playerStats.map((p) => {
									return (
										<tr key={uuid()}>
											<td>{p.name}</td>
											<td>{p.gp.toFixed(1)}</td>
											<td>{p.minutes !== 0 ? p.minutes.toFixed(1) : 0}</td>
											<td>{p.points !== 0 ? p.points.toFixed(1) : 0}</td>
											<td>{p.fgm !== 0 ? p.fgm.toFixed(1) : 0}</td>
											<td>{p.fga !== 0 ? p.fga.toFixed(1) : 0}</td>
											<td>{p.fgp !== 0 ? p.fgp.toFixed(1) : 0}</td>
											<td>{p.ftm !== 0 ? p.ftm.toFixed(1) : 0}</td>
											<td>{p.fta !== 0 ? p.fta.toFixed(1) : 0}</td>
											<td>{p.ftp !== 0 ? p.ftp.toFixed(1) : 0}</td>
											<td>{p.tpm !== 0 ? p.tpm.toFixed(1) : 0}</td>
											<td>{p.tpa !== 0 ? p.tpa.toFixed(1) : 0}</td>
											<td>{p.tpp !== 0 ? p.tpp.toFixed(1) : 0}</td>
											<td>{p.totalReb !== 0 ? p.totalReb.toFixed(1) : 0}</td>
											<td>{p.offReb !== 0 ? p.offReb.toFixed(1) : 0}</td>
											<td>{p.defReb !== 0 ? p.defReb.toFixed(1) : 0}</td>
											<td>{p.assists !== 0 ? p.assists.toFixed(1) : 0}</td>
											<td>{p.fouls !== 0 ? p.fouls.toFixed(1) : 0}</td>
											<td>{p.steals !== 0 ? p.steals.toFixed(1) : 0}</td>
											<td>{p.turnovers !== 0 ? p.turnovers.toFixed(1) : 0}</td>
											<td>{p.blocks !== 0 ? p.blocks.toFixed(1) : 0}</td>
											<td>{p.plusMinus !== 0 ? p.plusMinus.toFixed(1) : 0}</td>
										</tr>
									);
								})}
							</tbody>
						)}
					</Table>
				</div>
				<Container fluid="lg">
					<Row>
						<Col>
							<div className="TeamDetails-recent-games">
								<h5>Last 5</h5>
								{data.recentGames.map((g) => {
									return (
										<Stack direction="vertical">
											<Link to={`/games/${g.id}`}>
												<Card className="GameList-card mt-2" style={{ width: '70%' }}>
													<Card.Header>
														<Stack
															className="GameList-logos-container"
															direction="horizontal"
														>
															<Link to={`/teams/${g.home.id}`}>
																<Image
																	className="GameList-logo GameList-logo-home"
																	src={g.home.logo}
																/>
															</Link>
															<h6 className="TeamDetails-game-vs">&emsp;vs&emsp;</h6>
															<Link to={`/teams/${g.away.id}`}>
																<Image
																	className="GameList-logo GameList-logo-away"
																	src={g.away.logo}
																/>
															</Link>
														</Stack>
													</Card.Header>
													<Card.Body>
														<Card.Title>{g.score}</Card.Title>
														<Card.Text>
															{g.location} <br />
															{Moment(g.date).format('LLL')}
														</Card.Text>
													</Card.Body>
												</Card>
											</Link>
										</Stack>
									);
								})}
							</div>
						</Col>
						<Col>
							<div className="TeamDetails-next-games">
								<h5>Next 5</h5>
								{data.nextGames.map((g) => {
									return (
										<Stack direction="vertical">
											<Link to={`/games/${g.id}`}>
												<Card className="GameList-card mt-2" style={{ width: '70%' }}>
													<Card.Header>
														<Stack
															className="GameList-logos-container"
															direction="horizontal"
														>
															<Link to={`/teams/${g.home.id}`}>
																<Image
																	className="GameList-logo GameList-logo-home"
																	src={g.home.logo}
																/>
															</Link>
															<h6 className="TeamDetails-game-vs">&emsp;vs&emsp;</h6>
															<Link to={`/teams/${g.away.id}`}>
																<Image
																	className="GameList-logo GameList-logo-away"
																	src={g.away.logo}
																/>
															</Link>
														</Stack>
													</Card.Header>
													<Card.Body>
														<Card.Title>{g.location}</Card.Title>
														<Card.Text>{Moment(g.date).format('LLL')}</Card.Text>
													</Card.Body>
												</Card>
											</Link>
										</Stack>
									);
								})}
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default TeamDetails;
