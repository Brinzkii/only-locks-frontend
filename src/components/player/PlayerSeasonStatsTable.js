import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';
import '../../styles/player/PlayerSeasonStatsTable.css';

function PlayerSeasonStatsTable({
	stats,
	categories,
	navToPlayer,
	handleCategoryClick = undefined,
	activeSort = 'points',
}) {
	const [metric, setMetric] = useState('perGame');
	const handleMetricClick = (evt) => {
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
		<Table className="player-season-stats-table" size="sm" striped hover>
			<thead>
				<tr key={uuid()}>
					<th>
						<Button
							id="per36"
							variant="outline-primary"
							className="player-season-stats-table-metric-button"
							onClick={handleMetricClick}
							active={metric === 'per36'}
						>
							per36
						</Button>
						<Button
							id="perGame"
							variant="outline-primary"
							className="player-season-stats-table-metric-button"
							onClick={handleMetricClick}
							active={metric === 'perGame'}
						>
							perGame
						</Button>
						<Button
							id="totals"
							variant="outline-primary"
							className="player-season-stats-table-metric-button"
							onClick={handleMetricClick}
							active={metric === 'totals'}
						>
							Total
						</Button>
					</th>
					{Object.keys(categories).map((key) => {
						if (key !== 'id' || key !== 'name') {
							return (
								<th id={key} key={uuid()} onClick={!handleCategoryClick ? null : handleSortClick}>
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
					stats[metric].map((p) => {
						return (
							<tr key={uuid()}>
								<td id={`${p.id}`} onClick={navToPlayer}>
									{p.name}
								</td>

								<td id={activeSort === 'gp' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.gp.toFixed(1)}
								</td>
								<td id={activeSort === 'minutes' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.minutes !== 0 ? p.minutes.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'points' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.points !== 0 ? p.points.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fgm' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.fgm !== 0 ? p.fgm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fga' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.fga !== 0 ? p.fga.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fgp' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.fgp !== 0 ? p.fgp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'ftm' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.ftm !== 0 ? p.ftm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fta' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.fta !== 0 ? p.fta.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'ftp' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.ftp !== 0 ? p.ftp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpm' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.tpm !== 0 ? p.tpm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpa' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.tpa !== 0 ? p.tpa.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpp' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.tpp !== 0 ? p.tpp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'totalReb' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.totalReb !== 0 ? p.totalReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'offReb' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.offReb !== 0 ? p.offReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'defReb' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.defReb !== 0 ? p.defReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'assists' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.assists !== 0 ? p.assists.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fouls' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.fouls !== 0 ? p.fouls.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'steals' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.steals !== 0 ? p.steals.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'turnovers' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.turnovers !== 0 ? p.turnovers.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'blocks' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.blocks !== 0 ? p.blocks.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'plusMinus' ? 'PlayerSeasonStatsTable-sorted-col' : null}>
									{p.plusMinus !== 0 ? p.plusMinus.toFixed(1) : 0}
								</td>
							</tr>
						);
					})
				)}
			</tbody>
		</Table>
	);
}

export default PlayerSeasonStatsTable;
