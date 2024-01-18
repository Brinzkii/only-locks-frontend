import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
import '../../styles/team/TeamH2HTable.css';

function TeamH2HTable({ game, h2h, categories, navToTeam }) {
	if (!h2h) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<>
				<Table className="team-h2h-table" striped bordered hover size="sm">
					<thead>
						<tr>
							<th>
								<Stack>
									<Image
										id={game.homeId}
										onClick={navToTeam}
										className="team-h2h-table-logo mx-auto"
										src={game.homeLogo}
									/>
									<h5>
										<small>
											({h2h.totals[game.homeCode].wins}-{h2h.totals[game.homeCode].losses})
										</small>
									</h5>
								</Stack>
							</th>
							<th>
								<small>stat (per game)</small>
							</th>
							<th>
								<Stack>
									<Image
										id={game.awayId}
										onClick={navToTeam}
										className="team-h2h-table-logo mx-auto"
										src={game.awayLogo}
									/>

									<h5>
										<small>
											({h2h.totals[game.awayCode].wins}-{h2h.totals[game.awayCode].losses})
										</small>
									</h5>
								</Stack>
							</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(h2h.totals[game.homeCode]).map((key) => {
							if (key !== 'wins' && key !== 'losses') {
								return (
									<tr key={uuid()}>
										<td>
											{key === 'fgp' || key === 'ftp' || key === 'tpp'
												? (h2h.totals[game.homeCode][key] / h2h.gameStats.length).toFixed(1)
												: Math.round(h2h.totals[game.homeCode][key] / h2h.gameStats.length)}
										</td>
										<td>{categories[key] || key}</td>
										<td>
											{key === 'fgp' || key === 'ftp' || key === 'tpp'
												? (h2h.totals[game.awayCode][key] / h2h.gameStats.length).toFixed(1)
												: Math.round(h2h.totals[game.awayCode][key] / h2h.gameStats.length)}
										</td>
									</tr>
								);
							}
						})}
					</tbody>
				</Table>
			</>
		);
	}
}

export default TeamH2HTable;
