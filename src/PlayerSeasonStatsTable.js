import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';
import './TeamDetails.css';

function PlayerSeasonStatsTable({ stats, categories, navToPlayer, handleCategoryClick = undefined }) {
	const [display, setDisplay] = useState('perGame');
	const handleStatClick = (evt) => {
		if (evt.target.id !== display) setDisplay(evt.target.id);
	};

	return (
		<Table className="TeamDetails-player-stats-table" size="sm">
			<thead>
				<tr key={uuid()}>
					<th>
						<Button id="per36" className="TeamDetails-stat-sort-button" onClick={handleStatClick}>
							per36
						</Button>
						<Button id="perGame" className="TeamDetails-stat-sort-button" onClick={handleStatClick}>
							perGame
						</Button>
						<Button id="totals" className="TeamDetails-stat-sort-button" onClick={handleStatClick}>
							Total
						</Button>
					</th>
					{Object.keys(categories).map((key) => {
						if (key !== 'id' || key !== 'name') {
							return (
								<th id={key} onClick={!handleCategoryClick ? null : handleCategoryClick}>
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
					stats[display].map((p) => {
						return (
							<tr key={uuid()}>
								<td id={`${p.id}`} onClick={navToPlayer}>
									{p.name}
								</td>

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
					})
				)}
			</tbody>
		</Table>
	);
}

export default PlayerSeasonStatsTable;
