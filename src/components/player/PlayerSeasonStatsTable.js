import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { CaretDown } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack';
import uuid from 'react-uuid';
import '../../styles/player/PlayerSeasonStatsTable.css';

function PlayerSeasonStatsTable({ stats, categories, navToPlayer, handleCategoryClick = undefined, activeSort }) {
	const [metric, setMetric] = useState('perGame');
	const handleMetricClick = (evt) => {
		if (evt.target.id !== metric) setMetric(evt.target.id);
	};
	const handleSortClick = async (evt) => {
		const stat = evt.target.id;
		if (stat !== activeSort) {
			await handleCategoryClick(stat);
		}
	};

	return (
		<Table className="player-season-stats-table mb-0" size="sm" hover variant="dark">
			<thead>
				<tr key={uuid()}>
					<th className="player-season-stats-table-first-row">
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
								<th
									id={key}
									className="player-season-stats-table-category-header text-center"
									key={uuid()}
									onClick={!handleCategoryClick ? null : handleSortClick}
								>
									{key === activeSort ? (
										<Stack id={key} gap={1}>
											<span id={key} className="category mx-auto">
												{categories[key]}
											</span>
											<CaretDown id={key} className="sort-icon mx-auto" />
										</Stack>
									) : (
										categories[key]
									)}
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
								<td
									id={`${p.id}`}
									className="player-season-stats-table-player-box"
									onClick={navToPlayer}
								>
									{`${p.name} (${p.code})`}
								</td>

								<td
									id={
										activeSort === 'gp'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.gp.toFixed(1)}
								</td>
								<td
									id={
										activeSort === 'minutes'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.minutes !== 0 ? p.minutes.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'points'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.points !== 0 ? p.points.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'fgm'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.fgm !== 0 ? p.fgm.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'fga'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.fga !== 0 ? p.fga.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'fgp'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.fgp !== 0 ? p.fgp.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'ftm'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.ftm !== 0 ? p.ftm.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'fta'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.fta !== 0 ? p.fta.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'ftp'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.ftp !== 0 ? p.ftp.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'tpm'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.tpm !== 0 ? p.tpm.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'tpa'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.tpa !== 0 ? p.tpa.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'tpp'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.tpp !== 0 ? p.tpp.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'totalReb'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.totalReb !== 0 ? p.totalReb.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'offReb'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.offReb !== 0 ? p.offReb.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'defReb'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.defReb !== 0 ? p.defReb.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'assists'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.assists !== 0 ? p.assists.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'fouls'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.fouls !== 0 ? p.fouls.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'steals'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.steals !== 0 ? p.steals.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'turnovers'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.turnovers !== 0 ? p.turnovers.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'blocks'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
									{p.blocks !== 0 ? p.blocks.toFixed(1) : 0}
								</td>
								<td
									id={
										activeSort === 'plusMinus'
											? 'player-season-stats-table-sorted-col'
											: 'player-season-stats-table-col'
									}
								>
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
