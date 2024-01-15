import React from 'react';
import Stack from 'react-bootstrap/Stack';
import '../../styles/team/TeamTopPerformersTable.css';

function TeamTopPerformersStatsStack({ stats, category, team }) {
	if (category === 'points') {
		return (
			<Stack direction="horizontal" className="team-top-performers-table-stats-stack mx-auto">
				<div className="mx-auto data">{Math.round(stats[team][category].value)} pts</div>
				<div className="vr mx-auto"></div>
				<div className="mx-auto data">{stats[team][category].fg} fg</div>
				<div className="vr mx-auto"></div>
				<div className="mx-auto data">{stats[team][category].ft} ft</div>
			</Stack>
		);
	} else if (category === 'totalReb') {
		return (
			<Stack direction="horizontal" className="team-top-performers-table-stats-stack mx-auto">
				<div className="mx-auto data">{Math.round(stats[team][category].value)} rebs</div>
				<div className="vr mx-auto"></div>
				<div className="mx-auto data">{stats[team][category].defReb} def</div>
				<div className="vr mx-auto"></div>
				<div className="mx-auto data">{stats[team][category].offReb} off</div>
			</Stack>
		);
	} else if (category === 'assists') {
		return (
			<Stack direction="horizontal" className="team-top-performers-table-stats-stack mx-auto">
				<div className="mx-auto data">{Math.round(stats[team][category].value)} ast</div>
				<div className="vr mx-auto"></div>
				<div className="mx-auto data">{stats[team][category].turnovers} t/o</div>
				<div className="vr mx-auto"></div>
				<div className="mx-auto data">{stats[team][category].minutes} min</div>
			</Stack>
		);
	} else if (category === 'blocks' || category === 'steals') {
		return (
			<Stack direction="horizontal" className="team-top-performers-table-stats-stack mx-auto">
				<div className="mx-auto data">
					{Math.round(stats[team][category].value)}
					{category === 'blocks' ? ' blk' : ' stl'}
				</div>
				<div className="vr mx-auto"></div>
				<div className="mx-auto data">{stats[team][category].fouls} fouls</div>
				<div className="vr mx-auto"></div>
				<div className="mx-auto data">{stats[team][category].minutes} min</div>
			</Stack>
		);
	} else if (category === 'plusMinus') {
		return (
			<Stack direction="horizontal" className="team-top-performers-table-stats-stack mx-auto">
				<div className="mx-auto">
					+{Math.round(stats[team][category].value)} in {stats[team][category].minutes} min
				</div>
			</Stack>
		);
	}
}

export default TeamTopPerformersStatsStack;
