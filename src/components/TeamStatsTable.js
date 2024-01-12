import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import uuid from 'react-uuid';
import '../styles/TeamDetails.css';
import '../styles/TeamStatsTable.css';

function TeamStatsTable({ stats, categories, navToTeam, handleCategoryClick }) {
	console.log(stats);
	const [display, setDisplay] = useState('perGame');
	const handleStatClick = (evt) => {
		if (evt.target.id !== display) setDisplay(evt.target.id);
	};
	return (
		<Table className="TeamDetails-player-stats-table" size="sm">
			<thead>
				<tr key={uuid()}>
					<th>
						<Button id="perGame" className="TeamDetails-stat-sort-button" onClick={handleStatClick}>
							perGame
						</Button>
						<Button id="totals" className="TeamDetails-stat-sort-button" onClick={handleStatClick}>
							Total
						</Button>
					</th>
					{Object.keys(categories).map((key) => {
						if (categories[key]) {
							return (
								<th id={key} onClick={handleCategoryClick}>
									{categories[key]}
								</th>
							);
						}
					})}
				</tr>
			</thead>
			<tbody>
				{!stats ? (
					<Spinner animation="border" variant="info" />
				) : (
					stats[display].map((t) => {
						return (
							<tr key={uuid()}>
								<td id={`${t.id}`} onClick={navToTeam}>
									<Stack direction="horizontal">
										<Image className="TeamStatsTable-logo" src={t.logo} />
										&ensp;{t.name}
									</Stack>
								</td>

								<td>{t.games}</td>
								<td>{t.wins}</td>
								<td>{t.losses}</td>
								<td>{t.points !== 0 ? t.points.toFixed(1) : 0}</td>
								<td>{t.fgm !== 0 ? t.fgm.toFixed(1) : 0}</td>
								<td>{t.fga !== 0 ? t.fga.toFixed(1) : 0}</td>
								<td>{t.fgp !== 0 ? t.fgp.toFixed(1) : 0}</td>
								<td>{t.ftm !== 0 ? t.ftm.toFixed(1) : 0}</td>
								<td>{t.fta !== 0 ? t.fta.toFixed(1) : 0}</td>
								<td>{t.ftp !== 0 ? t.ftp.toFixed(1) : 0}</td>
								<td>{t.tpm !== 0 ? t.tpm.toFixed(1) : 0}</td>
								<td>{t.tpa !== 0 ? t.tpa.toFixed(1) : 0}</td>
								<td>{t.tpp !== 0 ? t.tpp.toFixed(1) : 0}</td>
								<td>{t.totalReb !== 0 ? t.totalReb.toFixed(1) : 0}</td>
								<td>{t.offReb !== 0 ? t.offReb.toFixed(1) : 0}</td>
								<td>{t.defReb !== 0 ? t.defReb.toFixed(1) : 0}</td>
								<td>{t.assists !== 0 ? t.assists.toFixed(1) : 0}</td>
								<td>{t.fouls !== 0 ? t.fouls.toFixed(1) : 0}</td>
								<td>{t.steals !== 0 ? t.steals.toFixed(1) : 0}</td>
								<td>{t.turnovers !== 0 ? t.turnovers.toFixed(1) : 0}</td>
								<td>{t.blocks !== 0 ? t.blocks.toFixed(1) : 0}</td>
								<td>{t.plusMinus !== 0 ? t.plusMinus.toFixed(1) : 0}</td>
							</tr>
						);
					})
				)}
			</tbody>
		</Table>
	);
}

export default TeamStatsTable;
