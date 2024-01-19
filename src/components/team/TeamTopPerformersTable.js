import React from 'react';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
import '../../styles/team/TeamTopPerformersTable.css';
import StatStack from './StatStack';

function TeamTopPerformersTable({
	teamStats,
	gameTopPlayers = undefined,
	seasonTopPlayers = undefined,
	navToPlayer,
	navToTeam,
	categories,
}) {
	if (!gameTopPlayers && !seasonTopPlayers) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Table striped action variant="dark" className="GameDetails-top-performers-table mx-auto mb-0">
				<thead>
					<tr>
						<th>
							<Stack>
								<Image
									id={teamStats.home.id}
									onClick={navToTeam}
									className="team-h2h-table-logo mx-auto"
									src={teamStats.home.logo}
								/>
								<h5>
									<small className="team-top-performers-table-team-record">
										({teamStats.home.wins}-{teamStats.home.losses})
									</small>
								</h5>
							</Stack>
						</th>
						<th>
							<div className="vr team-top-performers-table-separator"></div>
						</th>
						<th>
							<Stack>
								<Image
									id={teamStats.away.id}
									onClick={navToTeam}
									className="team-h2h-table-logo mx-auto"
									src={teamStats.away.logo}
								/>

								<h5>
									<small className="team-top-performers-table-team-record">
										({teamStats.away.wins}-{teamStats.away.losses})
									</small>
								</h5>
							</Stack>
						</th>
					</tr>
				</thead>
				<tbody>
					{!gameTopPlayers
						? Object.keys(seasonTopPlayers.home).map((key) => {
								if (key !== 'team') {
									return (
										<tr className="align-items-center" key={uuid()}>
											<td
												id={seasonTopPlayers.home[key].id}
												onClick={navToPlayer}
												className="team-top-performers-table-season-td"
											>
												<Stack id={seasonTopPlayers.home[key].id}>
													<div
														id={seasonTopPlayers.home[key].id}
														className="team-top-performers-table-player-name mx-auto"
													>
														{seasonTopPlayers.home[key].name}
													</div>
													<div id={seasonTopPlayers.home[key].id} className="mx-auto">
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

											<td className="team-top-performers-table-category pt-3">
												{categories[key]}
											</td>
											<td
												id={seasonTopPlayers.away[key].id}
												onClick={navToPlayer}
												className="team-top-performers-table-season-td"
											>
												<Stack id={seasonTopPlayers.away[key].id}>
													<div
														id={seasonTopPlayers.away[key].id}
														className="team-top-performers-table-player-name"
													>
														{seasonTopPlayers.away[key].name}
													</div>
													<div id={seasonTopPlayers.away[key].id}>
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
											<td
												className="mx-auto"
												id={gameTopPlayers.home[key].id}
												onClick={navToPlayer}
											>
												<Stack id={gameTopPlayers.home[key].id} className="mx-auto">
													<div
														id={gameTopPlayers.home[key].id}
														className="team-top-performers-table-player-name mx-auto"
													>
														{gameTopPlayers.home[key].name}
													</div>
													<div id={gameTopPlayers.home[key].id} className="mx-auto">
														<StatStack
															id={gameTopPlayers.home[key].id}
															stats={gameTopPlayers}
															category={key}
															team="home"
														/>
													</div>
												</Stack>
											</td>
											<td className="team-top-performers-table-category game-stats-category mx-auto">
												<Stack
													className={
														key === 'plusMinus'
															? 'team-top-performers-table-category-last-stack'
															: 'team-top-performers-table-category-stack'
													}
												>
													<div className="mt-auto mb-auto">{categories[key]}</div>
												</Stack>
											</td>
											<td
												className="mx-auto"
												id={gameTopPlayers.away[key].id}
												onClick={navToPlayer}
											>
												<Stack id={gameTopPlayers.away[key].id} className="mx-auto">
													<div
														id={gameTopPlayers.away[key].id}
														className="team-top-performers-table-player-name"
													>
														{gameTopPlayers.away[key].name}
													</div>
													<div id={gameTopPlayers.away[key].id} className="mx-auto">
														<StatStack
															id={gameTopPlayers.away[key].id}
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
