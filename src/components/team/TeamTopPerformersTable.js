import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'react-uuid';
// import '../styles/GameDetails.css';

function TeamTopPerformersTable({ gameTopPlayers = undefined, seasonTopPlayers = undefined, navToPlayer, categories }) {
	if (!gameTopPlayers && !seasonTopPlayers) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Table className="GameDetails-top-performers-table">
				<tbody>
					{!gameTopPlayers
						? Object.keys(seasonTopPlayers.home).map((key) => {
								if (key !== 'team') {
									return (
										<tr key={uuid()}>
											<td id={seasonTopPlayers.home[key].id} onClick={navToPlayer}>
												{seasonTopPlayers.home[key].name} (
												{key === 'plusMinus'
													? `+${Math.round(
															seasonTopPlayers.home[key].value /
																seasonTopPlayers.home[key].games
													  )}`
													: Math.round(
															seasonTopPlayers.home[key].value /
																seasonTopPlayers.home[key].games
													  )}
												)
											</td>

											<td>{categories[key]}</td>
											<td id={seasonTopPlayers.away[key].id} onClick={navToPlayer}>
												{seasonTopPlayers.away[key].name} (
												{key === 'plusMinus'
													? `+${Math.round(
															seasonTopPlayers.away[key].value /
																seasonTopPlayers.away[key].games
													  )}`
													: Math.round(
															seasonTopPlayers.away[key].value /
																seasonTopPlayers.away[key].games
													  )}
												)
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
												{gameTopPlayers.home[key].name}&ensp;
												{key === 'plusMinus'
													? `+${Math.round(gameTopPlayers.home[key].value)} in ${
															gameTopPlayers.home[key].minutes
													  }min`
													: key === 'points'
													? `(${Math.round(gameTopPlayers.home[key].value)})pts (${
															gameTopPlayers.home[key].fg
													  })fg (${gameTopPlayers.home[key].ft})ft`
													: key === 'totalReb'
													? `(${Math.round(gameTopPlayers.home[key].value)})reb (${
															gameTopPlayers.home[key].defReb
													  })dreb (${gameTopPlayers.home[key].offReb})oreb`
													: Math.round(gameTopPlayers.home[key].value)}
											</td>
											<td>{categories[key]}</td>
											<td id={gameTopPlayers.away[key].id} onClick={navToPlayer}>
												{gameTopPlayers.away[key].name} (
												{key === 'plusMinus'
													? `+${Math.round(gameTopPlayers.away[key].value)} in ${
															gameTopPlayers.away[key].minutes
													  }min`
													: Math.round(gameTopPlayers.away[key].value)}
												)
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
