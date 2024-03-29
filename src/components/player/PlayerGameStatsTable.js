import React from 'react';
import Moment from 'moment';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import { CaretDown } from 'react-bootstrap-icons';
import Loading from '../Loading';
import uuid from 'react-uuid';
import '../../styles/player/PlayerGameStatsTable.css';

function PlayerGameStatsTable({
	gameStats,
	player = undefined,
	games = undefined,
	navToGame,
	navToPlayer,
	handleCategoryClick,
	activeSort,
}) {
	const categories = {
		minutes: 'MIN',
		points: 'PTS',
		fgm: 'FGM',
		fga: 'FGA',
		fgp: 'FG%',
		ftm: 'FTM',
		fta: 'FTA',
		ftp: 'FT%',
		tpm: '3PM',
		tpa: '3PA',
		tpp: '3P%',
		totalReb: 'REB',
		offReb: 'ORB',
		defReb: 'DRB',
		assists: 'AST',
		fouls: 'PF',
		steals: 'STL',
		turnovers: 'TO',
		blocks: 'BLK',
		plusMinus: '+/-',
	};
	const handleSortClick = async (evt) => {
		const stat = evt.target.id;
		if (stat !== activeSort) {
			await handleCategoryClick(stat);
		}
	};
	return (
		<Table className="player-game-stats-table mb-0" size="sm" hover variant="dark">
			<thead>
				<tr key={uuid()}>
					<th></th>
					{Object.keys(categories).map((key) => {
						return (
							<th
								className="player-game-stats-table-category-header"
								id={key}
								key={uuid()}
								onClick={handleSortClick}
							>
								{key === activeSort ? (
									<Stack id={key} gap={1}>
										<span id={key} className="category mx-auto">
											{categories[key]}
										</span>
										<CaretDown id={key} className="sort-icon mx-auto" />
									</Stack>
								) : (
									categories[key]
								)}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{!gameStats || !gameStats.length ? (
					<Loading size="100px" />
				) : (
					gameStats.map((g) => {
						return (
							<tr key={uuid()}>
								<td
									className="player-game-stats-table-first-box"
									id={`${games ? g.gameId : g.id}`}
									onClick={games ? navToGame : navToPlayer}
								>
									{games ? (
										games.map((game) => {
											if (game.id === g.gameId) {
												if (game.home.id === player.teamId) {
													return (
														<span id={`${g.gameId}`} key={uuid()}>
															<Stack
																id={`${g.gameId}`}
																gap={1}
																direction="horizontal"
																className="player-game-stats-table-vs-stack mx-auto"
															>
																<div id={`${g.gameId}`} className="mx-auto">
																	VS
																</div>
																<div id={`${g.gameId}`} className="mx-auto">
																	{game.away.code}
																</div>
																<div id={`${g.gameId}`} className="mx-auto">
																	{Moment(game.date).format('l')}
																</div>
															</Stack>
														</span>
													);
												} else {
													return (
														<span id={`${g.gameId}`} key={uuid()}>
															<Stack
																id={`${g.gameId}`}
																gap={1}
																direction="horizontal"
																className="player-game-stats-table-vs-stack mx-auto"
															>
																<div id={`${g.gameId}`} className="mx-auto">
																	@
																</div>
																<div id={`${g.gameId}`} className="mx-auto">
																	{game.home.code}
																</div>
																<div id={`${g.gameId}`} className="mx-auto">
																	{Moment(game.date).format('l')}
																</div>
															</Stack>
														</span>
													);
												}
											}
										})
									) : (
										<span id={g.id}>
											{g.name} {`(${g.code})`}
										</span>
									)}
								</td>

								<td
									id={
										activeSort === 'minutes'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.minutes || 0}
								</td>
								<td
									id={
										activeSort === 'points'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.points || 0}
								</td>
								<td
									id={
										activeSort === 'fgm'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.fgm || 0}
								</td>
								<td
									id={
										activeSort === 'fga'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.fga || 0}
								</td>
								<td
									id={
										activeSort === 'fgp'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.fgp || 0}
								</td>
								<td
									id={
										activeSort === 'ftm'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.ftm || 0}
								</td>
								<td
									id={
										activeSort === 'fta'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.fta || 0}
								</td>
								<td
									id={
										activeSort === 'ftp'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.ftp || 0}
								</td>
								<td
									id={
										activeSort === 'tpm'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.tpm || 0}
								</td>
								<td
									id={
										activeSort === 'tpa'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.tpa || 0}
								</td>
								<td
									id={
										activeSort === 'tpp'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.tpp || 0}
								</td>
								<td
									id={
										activeSort === 'totalReb'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.totalReb || 0}
								</td>
								<td
									id={
										activeSort === 'offReb'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.offReb || 0}
								</td>
								<td
									id={
										activeSort === 'defReb'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.defReb || 0}
								</td>
								<td
									id={
										activeSort === 'assists'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.assists || 0}
								</td>
								<td
									id={
										activeSort === 'fouls'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.fouls || 0}
								</td>
								<td
									id={
										activeSort === 'steals'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.steals || 0}
								</td>
								<td
									id={
										activeSort === 'turnovers'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.turnovers || 0}
								</td>
								<td
									id={
										activeSort === 'blocks'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.blocks || 0}
								</td>
								<td
									id={
										activeSort === 'plusMinus'
											? 'player-game-stats-table-sorted-col'
											: 'player-game-stats-table-col'
									}
								>
									{g.plusMinus || 0}
								</td>
							</tr>
						);
					})
				)}
			</tbody>
		</Table>
	);
}

export default PlayerGameStatsTable;
