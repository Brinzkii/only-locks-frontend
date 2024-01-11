import React, { useState } from 'react';
import Moment from 'moment';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
import './PlayerGameStatsTable.css';

function PlayerGameStatsTable({
	gameStats,
	player = undefined,
	games = undefined,
	navToGame,
	navToPlayer,
	handleCategoryClick,
}) {
	const categories = {
		minutes: 'MIN',
		points: 'PTS',
		fgm: 'FGM',
		fga: 'FGA',
		fgp: 'FG%',
		ftm: 'FTM',
		fta: 'FTA',
		ftp: 'FT%',
		tpm: '3PM',
		tpa: '3PA',
		tpp: '3P%',
		totalReb: 'REB',
		offReb: 'ORB',
		defReb: 'DRB',
		assists: 'AST',
		fouls: 'PF',
		steals: 'STL',
		turnovers: 'TO',
		blocks: 'BLK',
		plusMinus: '+/-',
	};
	const [active, setActive] = useState(false);
	const toggleClass = (evt) => {
		setActive(evt.target.id);
		handleCategoryClick(evt.target.id);
	};
	return (
		<Table className="PlayerGameStatsTable" size="sm">
			<thead>
				<tr key={uuid()}>
					<th></th>
					{Object.keys(categories).map((key) => {
						return (
							<th id={key} key={uuid()} onClick={toggleClass}>
								{categories[key]}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{!gameStats ? (
					<Spinner animation="border" variant="info" />
				) : (
					gameStats.map((g) => {
						return (
							<tr key={uuid()}>
								<td id={`${games ? g.gameId : g.id}`} onClick={games ? navToGame : navToPlayer}>
									{games ? (
										games.map((game) => {
											if (game.id === g.gameId) {
												if (game.home.id === player.teamId) {
													return (
														<span id={`${g.gameId}`} key={uuid()}>
															VS{' '}
															<Image
																id={`${g.gameId}`}
																src={game.away.logo}
																alt=""
																className="PlayerGameStatsTable-logo"
															/>
															{Moment(game.date).format('l')}
														</span>
													);
												} else {
													return (
														<span id={`${g.gameId}`} key={uuid()}>
															@{' '}
															<Image
																id={`${g.gameId}`}
																src={game.home.logo}
																alt=""
																className="PlayerGameStatsTable-logo"
															/>
															{Moment(game.date).format('l')}
														</span>
													);
												}
											}
										})
									) : (
										<span id={g.id}>
											{g.name} {`(${g.code})`}
										</span>
									)}
								</td>

								<td id={active === 'minutes' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.minutes || 0}
								</td>
								<td id={active === 'points' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.points || 0}
								</td>
								<td id={active === 'fgm' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.fgm || 0}</td>
								<td id={active === 'fga' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.fga || 0}</td>
								<td id={active === 'fgp' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.fgp || 0}</td>
								<td id={active === 'ftm' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.ftm || 0}</td>
								<td id={active === 'fta' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.fta || 0}</td>
								<td id={active === 'ftp' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.ftp || 0}</td>
								<td id={active === 'tpm' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.tpm || 0}</td>
								<td id={active === 'tpa' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.tpa || 0}</td>
								<td id={active === 'tpp' ? 'PlayerGameStatsTable-sorted-col' : null}>{g.tpp || 0}</td>
								<td id={active === 'totalReb' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.totalReb || 0}
								</td>
								<td id={active === 'offReb' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.offReb || 0}
								</td>
								<td id={active === 'defReb' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.defReb || 0}
								</td>
								<td id={active === 'assists' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.assists || 0}
								</td>
								<td id={active === 'fouls' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.fouls || 0}
								</td>
								<td id={active === 'steals' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.steals || 0}
								</td>
								<td id={active === 'turnovers' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.turnovers || 0}
								</td>
								<td id={active === 'blocks' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.blocks || 0}
								</td>
								<td id={active === 'plusMinus' ? 'PlayerGameStatsTable-sorted-col' : null}>
									{g.plusMinus || 0}
								</td>
							</tr>
						);
					})
				)}
			</tbody>
		</Table>
	);
}

export default PlayerGameStatsTable;
