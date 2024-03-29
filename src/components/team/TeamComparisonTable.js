import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
import '../../styles/team/TeamComparisonTable.css';

function TeamComparisonTable({ game, gameStats = undefined, teamStats = undefined, navToTeam, title }) {
	const categories = {
		points: 'Points',
		fgm: 'Field Goals Made',
		fga: 'Field Goal Attempts',
		fgp: 'Field Goal %',
		ftm: 'Free Throws Made',
		fta: 'Free Throw Attempts',
		ftp: 'Free Throw %',
		tpm: 'Three Pointers Made',
		tpa: 'Three Point Attempts',
		tpp: 'Three Point %',
		offReb: 'Offensive Rebounds',
		defReb: 'Defensive Rebounds',
		totalReb: 'Rebounds',
		assists: 'Assists',
		fouls: 'Fouls',
		steals: 'Steals',
		turnovers: 'Turnovers',
		blocks: 'Blocks',
		plusMinus: 'Plus/Minus',
	};
	if (gameStats === undefined && teamStats === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="team-comparison-table-container">
				<Table className="team-comparison-table" size="sm" striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>
								<Stack direction="vertical">
									<Image
										id={game.homeId}
										onClick={navToTeam}
										className="team-comparison-table-logo mx-auto"
										src={game.homeLogo}
									/>
									<h5>
										<small>
											({teamStats.home.wins}-{teamStats.home.losses})
										</small>
									</h5>
								</Stack>
							</th>
							<th>
								<small>{title}</small>
							</th>
							<th>
								<Stack>
									<Image
										id={game.awayId}
										onClick={navToTeam}
										className="team-comparison-table-logo mx-auto"
										src={game.awayLogo}
									/>

									<h5>
										<small>
											({teamStats.away.wins}-{teamStats.away.losses})
										</small>
									</h5>
								</Stack>
							</th>
						</tr>
					</thead>
					<tbody>
						{!gameStats
							? Object.keys(teamStats.home).map((key, idx) => {
									if (idx > 9) {
										return (
											<tr key={uuid()}>
												<td>
													{key === 'fgp' || key === 'ftp' || key === 'tpp'
														? teamStats.home[key]
														: Math.round(teamStats.home[key] / teamStats.home.games)}
												</td>
												<td>{categories[key] || key}</td>
												<td>
													{key === 'fgp' || key === 'ftp' || key === 'tpp'
														? teamStats.away[key]
														: Math.round(teamStats.away[key] / teamStats.away.games)}
												</td>
											</tr>
										);
									}
							  })
							: Object.keys(gameStats.home).map((key, idx) => {
									if (idx > 5) {
										return (
											<tr key={uuid()}>
												<td>{gameStats.home[key]}</td>
												<td>{categories[key]}</td>
												<td>{gameStats.away[key]}</td>
											</tr>
										);
									}
							  })}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default TeamComparisonTable;
