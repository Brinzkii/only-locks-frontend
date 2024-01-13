import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import uuid from 'react-uuid';
import '../../styles/team/TeamDetails.css';
import '../../styles/team/TeamStatsTable.css';

function TeamStatsTable({ stats, categories, navToTeam, handleCategoryClick, activeSort }) {
	console.log(stats);
	const [metric, setMetric] = useState('perGame');
	const handleStatClick = (evt) => {
		if (evt.target.id !== metric) setMetric(evt.target.id);
	};
	const handleSortClick = async (evt) => {
		const stat = evt.target.id;
		console.log(stat);
		if (stat !== activeSort) {
			await handleCategoryClick(evt);
		}
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
								<th id={key} onClick={handleSortClick}>
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
					stats[metric].map((t) => {
						return (
							<tr key={uuid()}>
								<td id={`${t.id}`} onClick={navToTeam}>
									<Stack direction="horizontal">
										<Image className="TeamStatsTable-logo" src={t.logo} />
										&ensp;{t.name}
									</Stack>
								</td>

								<td id={activeSort === 'gp' ? 'TeamStatsTable-sorted-col' : null}>{t.games}</td>
								<td id={activeSort === 'wins' ? 'TeamStatsTable-sorted-col' : null}>{t.wins}</td>
								<td id={activeSort === 'losses' ? 'TeamStatsTable-sorted-col' : null}>{t.losses}</td>
								<td id={activeSort === 'points' ? 'TeamStatsTable-sorted-col' : null}>
									{t.points !== 0 ? t.points.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fgm' ? 'TeamStatsTable-sorted-col' : null}>
									{t.fgm !== 0 ? t.fgm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fga' ? 'TeamStatsTable-sorted-col' : null}>
									{t.fga !== 0 ? t.fga.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fgp' ? 'TeamStatsTable-sorted-col' : null}>
									{t.fgp !== 0 ? t.fgp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'ftm' ? 'TeamStatsTable-sorted-col' : null}>
									{t.ftm !== 0 ? t.ftm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fta' ? 'TeamStatsTable-sorted-col' : null}>
									{t.fta !== 0 ? t.fta.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'ftp' ? 'TeamStatsTable-sorted-col' : null}>
									{t.ftp !== 0 ? t.ftp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpm' ? 'TeamStatsTable-sorted-col' : null}>
									{t.tpm !== 0 ? t.tpm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpa' ? 'TeamStatsTable-sorted-col' : null}>
									{t.tpa !== 0 ? t.tpa.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpp' ? 'TeamStatsTable-sorted-col' : null}>
									{t.tpp !== 0 ? t.tpp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'totalReb' ? 'TeamStatsTable-sorted-col' : null}>
									{t.totalReb !== 0 ? t.totalReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'offReb' ? 'TeamStatsTable-sorted-col' : null}>
									{t.offReb !== 0 ? t.offReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'defReb' ? 'TeamStatsTable-sorted-col' : null}>
									{t.defReb !== 0 ? t.defReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'assists' ? 'TeamStatsTable-sorted-col' : null}>
									{t.assists !== 0 ? t.assists.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fouls' ? 'TeamStatsTable-sorted-col' : null}>
									{t.fouls !== 0 ? t.fouls.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'steals' ? 'TeamStatsTable-sorted-col' : null}>
									{t.steals !== 0 ? t.steals.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'turnovers' ? 'TeamStatsTable-sorted-col' : null}>
									{t.turnovers !== 0 ? t.turnovers.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'blocks' ? 'TeamStatsTable-sorted-col' : null}>
									{t.blocks !== 0 ? t.blocks.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'plusMinus' ? 'TeamStatsTable-sorted-col' : null}>
									{t.plusMinus !== 0 ? t.plusMinus.toFixed(1) : 0}
								</td>
							</tr>
						);
					})
				)}
			</tbody>
		</Table>
	);
}

export default TeamStatsTable;
