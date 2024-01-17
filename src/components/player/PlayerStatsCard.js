import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';
import Spinner from 'react-bootstrap/Spinner';
import '../../styles/player/PlayerStatsCard.css';

function PlayerStatsCard({ title, stats, conversions, navToPlayer }) {
	const [metric, setMetric] = useState('perGame');
	const handleMetricClick = (evt) => {
		if (evt.target.id !== metric) setMetric(evt.target.id);
	};
	useEffect(() => {
		setMetric('perGame');
	}, [stats]);
	if (!stats) {
		return <Spinner animation="border" variant="info" />;
	} else {
		console.log(stats);
		return (
			<Table className="player-stats-card-table mx-auto" size="sm" striped hover>
				<thead>
					<tr className="player-stats-card-title">{title}</tr>
				</thead>
				<tbody>
					{!stats.perGame ? (
						stats.map((p) => {
							return (
								<tr id={p.id} onClick={navToPlayer} key={uuid()}>
									<td id={p.id}>
										{p.name} {`(${p.code})`} {p[conversions[title]]}
									</td>
								</tr>
							);
						})
					) : (
						<>
							<tr className="player-stats-card-metric-button-row">
								<Button
									id="per36"
									onClick={handleMetricClick}
									className="player-stats-card-metric-button"
									active={metric === 'per36'}
								>
									per36
								</Button>
								<Button
									id="perGame"
									onClick={handleMetricClick}
									className="player-stats-card-metric-button"
									active={metric === 'perGame'}
								>
									perGame
								</Button>
								<Button
									id="totals"
									onClick={handleMetricClick}
									className="player-stats-card-metric-button"
									active={metric === 'totals'}
								>
									totals
								</Button>
							</tr>
							{stats[metric].map((p) => {
								return (
									<tr
										className="player-stats-card-player-row"
										id={p.id}
										onClick={navToPlayer}
										key={uuid()}
									>
										<td id={p.id}>
											{p.name} {`(${p.code})`}{' '}
											{metric === 'perGame' || metric === 'per36'
												? p[conversions[title]].toFixed(1)
												: p[conversions[title]]}
										</td>
									</tr>
								);
							})}
						</>
					)}
				</tbody>
			</Table>
		);
	}
}

export default PlayerStatsCard;
