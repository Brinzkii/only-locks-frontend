import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';

function PlayerStatsCard({ title, stats, conversions, navToPlayer }) {
	const [display, setDisplay] = useState('perGame');
	const handleStatClick = (evt) => {
		if (evt.target.id !== display) setDisplay(evt.target.id);
	};
	return (
		<Table className="PlayerStatsCard-table">
			<thead>
				<tr className="PlayerStatsCard-title">{title}</tr>
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
						<tr className="PlayerStatsCard-button-row">
							<Button id="per36" onClick={handleStatClick} className="PlayerStatsCard-button">
								per36
							</Button>
							<Button id="perGame" onClick={handleStatClick} className="PlayerStatsCard-button">
								perGame
							</Button>
							<Button id="totals" onClick={handleStatClick} className="PlayerStatsCard-button">
								totals
							</Button>
						</tr>
						{stats[display].map((p) => {
							return (
								<tr id={p.id} onClick={navToPlayer} key={uuid()}>
									<td id={p.id}>
										{p.name} {`(${p.code})`}{' '}
										{display === 'perGame' || display === 'per36'
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

export default PlayerStatsCard;
