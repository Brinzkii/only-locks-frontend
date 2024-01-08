import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';

function PlayerStatsCard({ title, stats, conversions, navToPlayer }) {
	const [display, setDisplay] = useState('perGame');
	const handleStatClick = (evt) => {
		if (evt.target.id !== display) setDisplay(evt.target.id);
	};
	return (
		<div className="PlayerStatsCard">
			<h4>{title}</h4>
			{!stats.perGame ? (
				stats.map((p) => {
					return (
						<h5 id={p.id} onClick={navToPlayer} key={uuid()}>
							{p.name} {`(${p.code})`} {p[conversions[title]]}
						</h5>
					);
				})
			) : (
				<>
					<Button id="per36" onClick={handleStatClick}>
						per36
					</Button>
					<Button id="perGame" onClick={handleStatClick}>
						perGame
					</Button>
					<Button id="totals" onClick={handleStatClick}>
						totals
					</Button>
					{stats[display].map((p) => {
						return (
							<h5 id={p.id} onClick={navToPlayer} key={uuid()}>
								{p.name} {`(${p.code})`}{' '}
								{display === 'perGame' || display === 'per36'
									? p[conversions[title]].toFixed(1)
									: p[conversions[title]]}
							</h5>
						);
					})}
				</>
			)}
		</div>
	);
}

export default PlayerStatsCard;
