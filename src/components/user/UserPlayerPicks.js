import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Trophy, XCircle } from 'react-bootstrap-icons';
import Moment from 'moment';
import uuid from 'react-uuid';
import '../../styles/user/UserPicks.css';

function UserPlayerPicks({ picks, quarters, navToPlayer, navToGame }) {
	if (!picks) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Card>
				<Card.Header className="pick-header text-center">
					Player Picks <small>({picks.playerPickRecord})</small>
				</Card.Header>
				<Card.Body>
					<ListGroup variant="flush" className="pick-list-group text-center">
						{picks.playerPicks.map((p, idx) =>
							p.status === 'in play' ? (
								// Live pick

								<ListGroup.Item
									action
									onClick={navToGame}
									id={p.gameId}
									className="pick-pending"
									key={uuid()}
								>
									<h6 id={p.gameId}>
										{p.player} {p.overUnder} {p.value} {p.stat === 'tpm' ? 'threes' : p.stat} -{' '}
										<Badge
											pill
											bg={
												p.overUnder === 'OVER' && p.value >= p[p.stat]
													? 'danger'
													: p.overUnder === 'OVER' && p.value < p[p.stat]
													? 'success'
													: p.overUnder === 'UNDER' && p.value <= p[p.stat]
													? 'danger'
													: p.overUnder === 'UNDER' && p.value > p[p.stat]
													? 'success'
													: 'warning'
											}
										>
											{p[p.stat]}
										</Badge>
									</h6>
									<>
										<h6 id={p.gameId}>
											{p.clock} - {quarters[p.quarter]}
										</h6>
										<h6 id={p.gameId}>{p.game}</h6>

										<h6 id={p.gameId}>{p.score}</h6>
									</>
								</ListGroup.Item>
							) : p.status === 'finished' ? (
								// Finished pick

								<ListGroup.Item
									action
									onClick={navToGame}
									id={p.gameId}
									className={p.result === true ? 'pick-winner' : 'pick-loser'}
									key={uuid()}
								>
									{p.result === true ? (
										<h4 className="pick-win-text text-center" id={p.gameId}>
											<Trophy className="pick-win-trophy mx-auto"></Trophy>
											+${p.pointValue}
										</h4>
									) : (
										<h4 className="pick-loss-text text-center" id={p.gameId}>
											<XCircle></XCircle>
										</h4>
									)}
									<h6 id={p.gameId}>
										{p.player} {p.overUnder} {p.value} {p.stat === 'tpm' ? 'threes' : p.stat} -{' '}
										<Badge
											pill
											bg={
												p.overUnder === 'OVER' && p.value >= p[p.stat]
													? 'danger'
													: p.overUnder === 'OVER' && p.value < p[p.stat]
													? 'success'
													: p.overUnder === 'UNDER' && p.value <= p[p.stat]
													? 'danger'
													: p.overUnder === 'UNDER' && p.value > p[p.stat]
													? 'success'
													: 'warning'
											}
										>
											{p[p.stat]}
										</Badge>
									</h6>
									<>
										<h6 id={p.gameId}>
											<small>
												{p.location} - ({Moment(p.date).format('M-DD-YY')})
											</small>
										</h6>
										<h6 id={p.gameId}>{p.game}</h6>
										<h6>{p.score}</h6>
									</>
								</ListGroup.Item>
							) : (
								// Pending pick

								<ListGroup.Item
									action
									onClick={navToPlayer}
									id={p.playerId}
									className="pick-pending"
									key={uuid()}
								>
									<h6 id={p.playerId}>
										{p.player} {p.overUnder} {p.value} {p.stat === 'tpm' ? 'threes' : p.stat}
									</h6>
									<>
										<h6 id={p.playerId}>
											{p.game} <small>({Moment(p.date).format('MMM Do h:mm a')})</small>
										</h6>
										<h6 id={p.gameId}>
											<small>{p.location}</small>
										</h6>
									</>
								</ListGroup.Item>
							)
						)}
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
}

export default UserPlayerPicks;
