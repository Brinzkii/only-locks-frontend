import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import { CaretDown } from 'react-bootstrap-icons';
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
		<Table className="team-stats-table" size="sm">
			<thead>
				<tr key={uuid()}>
					<th cla>
						<Button
							id="perGame"
							variant="outline-primary"
							active={metric === 'perGame'}
							className="TeamDetails-stat-sort-button"
							onClick={handleStatClick}
						>
							perGame
						</Button>
						<Button
							id="totals"
							variant="outline-primary"
							active={metric === 'totals'}
							className="TeamDetails-stat-sort-button"
							onClick={handleStatClick}
						>
							Total
						</Button>
					</th>
					{Object.keys(categories).map((key) => {
						if (categories[key]) {
							return (
								<th className="team-stats-table-category-header" id={key} onClick={handleSortClick}>
									{key === activeSort ? (
										<>
											{categories[key]}
											<CaretDown />
										</>
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
					stats[metric].map((t) => {
						return (
							<tr key={uuid()}>
								<td id={`${t.id}`} onClick={navToTeam}>
									<Stack direction="horizontal">
										<Image className="team-stats-table-logo" src={t.logo} />
										&ensp;{t.name}
									</Stack>
								</td>

								<td id={activeSort === 'gp' ? 'team-stats-table-sorted-col' : null}>{t.games}</td>
								<td id={activeSort === 'wins' ? 'team-stats-table-sorted-col' : null}>{t.wins}</td>
								<td id={activeSort === 'losses' ? 'team-stats-table-sorted-col' : null}>{t.losses}</td>
								<td id={activeSort === 'points' ? 'team-stats-table-sorted-col' : null}>
									{t.points !== 0 ? t.points.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fgm' ? 'team-stats-table-sorted-col' : null}>
									{t.fgm !== 0 ? t.fgm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fga' ? 'team-stats-table-sorted-col' : null}>
									{t.fga !== 0 ? t.fga.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fgp' ? 'team-stats-table-sorted-col' : null}>
									{t.fgp !== 0 ? t.fgp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'ftm' ? 'team-stats-table-sorted-col' : null}>
									{t.ftm !== 0 ? t.ftm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fta' ? 'team-stats-table-sorted-col' : null}>
									{t.fta !== 0 ? t.fta.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'ftp' ? 'team-stats-table-sorted-col' : null}>
									{t.ftp !== 0 ? t.ftp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpm' ? 'team-stats-table-sorted-col' : null}>
									{t.tpm !== 0 ? t.tpm.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpa' ? 'team-stats-table-sorted-col' : null}>
									{t.tpa !== 0 ? t.tpa.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'tpp' ? 'team-stats-table-sorted-col' : null}>
									{t.tpp !== 0 ? t.tpp.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'totalReb' ? 'team-stats-table-sorted-col' : null}>
									{t.totalReb !== 0 ? t.totalReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'offReb' ? 'team-stats-table-sorted-col' : null}>
									{t.offReb !== 0 ? t.offReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'defReb' ? 'team-stats-table-sorted-col' : null}>
									{t.defReb !== 0 ? t.defReb.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'assists' ? 'team-stats-table-sorted-col' : null}>
									{t.assists !== 0 ? t.assists.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'fouls' ? 'team-stats-table-sorted-col' : null}>
									{t.fouls !== 0 ? t.fouls.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'steals' ? 'team-stats-table-sorted-col' : null}>
									{t.steals !== 0 ? t.steals.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'turnovers' ? 'team-stats-table-sorted-col' : null}>
									{t.turnovers !== 0 ? t.turnovers.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'blocks' ? 'team-stats-table-sorted-col' : null}>
									{t.blocks !== 0 ? t.blocks.toFixed(1) : 0}
								</td>
								<td id={activeSort === 'plusMinus' ? 'team-stats-table-sorted-col' : null}>
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
