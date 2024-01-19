import React from 'react';
import Stack from 'react-bootstrap/Stack';
import '../../styles/team/StatStack.css';

function TeamTopPerformersStatsStack({ stats, category, team }) {
	console.log(stats);
	if (category === 'points') {
		return (
			<Stack id={stats[team][category].id} direction="horizontal" gap={5} className="stat-stack mx-auto">
				<div id={stats[team][category].id} className="mx-auto data">
					{Math.round(stats[team][category].value)} pts
				</div>
				<div id={stats[team][category].id} className="vr mx-auto"></div>
				<div id={stats[team][category].id} className="mx-auto data">
					{stats[team][category].fg} fg
				</div>
				<div id={stats[team][category].id} className="vr mx-auto"></div>
				<div id={stats[team][category].id} className="mx-auto data">
					{stats[team][category].ft} ft
				</div>
			</Stack>
		);
	} else if (category === 'totalReb') {
		return (
			<Stack id={stats[team][category].id} direction="horizontal" gap={5} className="stat-stack mx-auto">
				<div id={stats[team][category].id} className="mx-auto data">
					{Math.round(stats[team][category].value)} rebs
				</div>
				<div id={stats[team][category].id} className="vr mx-auto"></div>
				<div id={stats[team][category].id} className="mx-auto data">
					{stats[team][category].defReb} def
				</div>
				<div id={stats[team][category].id} className="vr mx-auto"></div>
				<div id={stats[team][category].id} className="mx-auto data">
					{stats[team][category].offReb} off
				</div>
			</Stack>
		);
	} else if (category === 'assists') {
		return (
			<Stack id={stats[team][category].id} direction="horizontal" gap={5} className="stat-stack mx-auto">
				<div id={stats[team][category].id} className="mx-auto data">
					{Math.round(stats[team][category].value)} ast
				</div>
				<div id={stats[team][category].id} className="vr mx-auto"></div>
				<div id={stats[team][category].id} className="mx-auto data">
					{stats[team][category].turnovers} t/o
				</div>
				<div id={stats[team][category].id} className="vr mx-auto"></div>
				<div id={stats[team][category].id} className="mx-auto data">
					{stats[team][category].minutes} min
				</div>
			</Stack>
		);
	} else if (category === 'blocks' || category === 'steals') {
		return (
			<Stack id={stats[team][category].id} direction="horizontal" gap={5} className="stat-stack mx-auto">
				<div id={stats[team][category].id} className="mx-auto data">
					{Math.round(stats[team][category].value)}
					{category === 'blocks' ? ' blk' : ' stl'}
				</div>
				<div id={stats[team][category].id} className="vr mx-auto"></div>
				<div id={stats[team][category].id} className="mx-auto data">
					{stats[team][category].fouls} fouls
				</div>
				<div id={stats[team][category].id} className="vr mx-auto"></div>
				<div id={stats[team][category].id} className="mx-auto data">
					{stats[team][category].minutes} min
				</div>
			</Stack>
		);
	} else if (category === 'plusMinus') {
		return (
			<Stack id={stats[team][category].id} direction="horizontal" gap={5} className="stat-stack mx-auto">
				<div id={stats[team][category].id} className="mx-auto">
					+{Math.round(stats[team][category].value)} in {stats[team][category].minutes} min
				</div>
			</Stack>
		);
	}
}

export default TeamTopPerformersStatsStack;
