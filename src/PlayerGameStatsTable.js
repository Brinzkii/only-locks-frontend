import React, { useState } from 'react';
import OnlyLocksAPI from './OnlyLocksAPI';
import Moment from 'moment';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
import './PlayerGameStatsTable.css';

function PlayerGameStatsTable({ gameStats, player = undefined, games = undefined, navToGame, navToPlayer }) {
	const [stats, setStats] = useState(gameStats);
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
	function handleCategoryClick(evt) {
		evt.preventDefault();
		async function sortGameStats(stat) {
			setStats(undefined);
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
			};
			stat = conversions[stat] || stat;
			const gameStats = await OnlyLocksAPI.sortPlayerStats({ stat, time: 'all games', playerId: player.id });

			setStats(gameStats);
		}
		sortGameStats(evt.target.id);
	}

	return (
		<Table className="PlayerGameStatsTable" size="sm">
			<thead>
				<tr key={uuid()}>
					<th></th>
					{Object.keys(categories).map((key) => {
						return (
							<th id={key} key={uuid()} onClick={!handleCategoryClick ? null : handleCategoryClick}>
								{categories[key]}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{!stats ? (
					<Spinner animation="border" variant="info" />
				) : (
					stats.map((g) => {
						return (
							<tr key={uuid()}>
								<td id={`${g.gameId || g.id}`} onClick={navToGame || navToPlayer}>
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

								<td>{g.minutes || 0}</td>
								<td>{g.points || 0}</td>
								<td>{g.fgm || 0}</td>
								<td>{g.fga || 0}</td>
								<td>{g.fgp || 0}</td>
								<td>{g.ftm || 0}</td>
								<td>{g.fta || 0}</td>
								<td>{g.ftp || 0}</td>
								<td>{g.tpm || 0}</td>
								<td>{g.tpa || 0}</td>
								<td>{g.tpp || 0}</td>
								<td>{g.totalReb || 0}</td>
								<td>{g.offReb || 0}</td>
								<td>{g.defReb || 0}</td>
								<td>{g.assists || 0}</td>
								<td>{g.fouls || 0}</td>
								<td>{g.steals || 0}</td>
								<td>{g.turnovers || 0}</td>
								<td>{g.blocks || 0}</td>
								<td>{g.plusMinus || 0}</td>
							</tr>
						);
					})
				)}
			</tbody>
		</Table>
	);
}

export default PlayerGameStatsTable;
