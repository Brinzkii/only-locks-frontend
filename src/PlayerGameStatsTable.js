import React, { useState } from 'react';
import Moment from 'moment';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
// import './TeamDetails.css';

function PlayerGameStatsTable({ stats, navToGame, player = undefined, games = undefined }) {
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
		console.log(evt.target.id);
	}
	console.log(games);
	return (
		<Table className="PlayerGameStatsTable" size="sm">
			<thead>
				<tr key={uuid()}>
					<th></th>
					{Object.keys(categories).map((key) => {
						return (
							<th id={key} onClick={!handleCategoryClick ? null : handleCategoryClick}>
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
								<td id={`${g.gameId}`} onClick={navToGame}>
									{games
										? games.map((game) => {
												if (game.id === g.gameId) {
													if (game.home.id === player.teamId) {
														return `VS ${game.away.code} (${Moment(game.date).format(
															'l'
														)})`;
													} else {
														return `@ ${game.home.code} (${Moment(game.date).format('l')})`;
													}
												}
										  })
										: g.name}
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
