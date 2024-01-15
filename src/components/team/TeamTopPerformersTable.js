import React from 'react';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
import '../../styles/team/TeamTopPerformersTable.css';
import TeamTopPerformersStatsStack from './TeamTopPerformersStatsStack';

function TeamTopPerformersTable({ gameTopPlayers = undefined, seasonTopPlayers = undefined, navToPlayer, categories }) {
	if (!gameTopPlayers && !seasonTopPlayers) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Table className="GameDetails-top-performers-table mx-auto">
				<tbody>
					{!gameTopPlayers
						? Object.keys(seasonTopPlayers.home).map((key) => {
								if (key !== 'team') {
									return (
										<tr key={uuid()}>
											<td
												id={seasonTopPlayers.home[key].id}
												onClick={navToPlayer}
												className="team-top-performers-table-season-td"
											>
												<Stack>
													<div className="team-top-performers-table-player-name mx-auto">
														{seasonTopPlayers.home[key].name}
													</div>
													<div className="mx-auto">
														{key === 'plusMinus'
															? `+${Math.round(
																	seasonTopPlayers.home[key].value /
																		seasonTopPlayers.home[key].games
															  )}`
															: Math.round(
																	seasonTopPlayers.home[key].value /
																		seasonTopPlayers.home[key].games
															  )}
													</div>
												</Stack>
											</td>

											<td className="team-top-performers-table-category">{categories[key]}</td>
											<td
												id={seasonTopPlayers.away[key].id}
												onClick={navToPlayer}
												className="team-top-performers-table-season-td"
											>
												<Stack>
													<div className="team-top-performers-table-player-name">
														{seasonTopPlayers.away[key].name}
													</div>
													<div>
														{key === 'plusMinus'
															? `+${Math.round(
																	seasonTopPlayers.away[key].value /
																		seasonTopPlayers.away[key].games
															  )}`
															: Math.round(
																	seasonTopPlayers.away[key].value /
																		seasonTopPlayers.away[key].games
															  )}
													</div>
												</Stack>
											</td>
										</tr>
									);
								}
						  })
						: Object.keys(gameTopPlayers.home).map((key) => {
								if (key !== 'team') {
									return (
										<tr key={uuid()}>
											<td id={gameTopPlayers.home[key].id} onClick={navToPlayer}>
												<Stack>
													<div className="team-top-performers-table-player-name">
														{gameTopPlayers.home[key].name}
													</div>
													<div>
														<TeamTopPerformersStatsStack
															stats={gameTopPlayers}
															category={key}
															team="home"
														/>
													</div>
												</Stack>
											</td>
											<td className="team-top-performers-table-category">{categories[key]}</td>
											<td id={gameTopPlayers.away[key].id} onClick={navToPlayer}>
												<Stack>
													<div className="team-top-performers-table-player-name">
														{gameTopPlayers.away[key].name}
													</div>
													<div>
														<TeamTopPerformersStatsStack
															stats={gameTopPlayers}
															category={key}
															team="away"
														/>
													</div>
												</Stack>
											</td>
										</tr>
									);
								}
						  })}
				</tbody>
			</Table>
		);
	}
}

export default TeamTopPerformersTable;
