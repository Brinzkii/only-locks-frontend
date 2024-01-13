import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OnlyLocksAPI from '../api/OnlyLocksAPI';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Moment from 'moment';
import uuid from 'react-uuid';

function UserPlayerPicks({ picks, quarters, navToPlayer, navToGame }) {
	if (!picks) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Card>
				<Card.Header className="text-center">
					Player Picks <small>({picks.playerPickRecord})</small>
				</Card.Header>
				<Card.Body>
					<ListGroup className="text-center">
						{picks.playerPicks.map((p, idx) => (
							<ListGroup.Item
								onClick={navToPlayer}
								id={p.playerId}
								className={
									p.result === true
										? 'player-pick-winner'
										: p.result === false
										? 'player-pick-loser'
										: 'player-pick-pending'
								}
								key={uuid()}
							>
								{p.result === true ? (
									<h5 className="player-pick-win-text text-center" id={p.playerId}>
										Win: +${p.pointValue}
									</h5>
								) : p.result === false ? (
									<h5 className="player-pick-loss-text text-center" id={p.playerId}>
										Loss
									</h5>
								) : (
									<></>
								)}
								<h6 id={p.playerId}>
									{p.player} {p.overUnder} {p.value} {p.stat === 'tpm' ? 'threes' : p.stat} -{' '}
									<strong
										className={
											p.overUnder === 'OVER' && p.value >= p[p.stat]
												? 'player-pick-bad-value'
												: p.overUnder === 'OVER' && p.value < p[p.stat]
												? 'player-pick-good-value'
												: p.overUnder === 'UNDER' && p.value <= p[p.stat]
												? 'player-pick-bad-value'
												: p.overUnder === 'UNDER' && p.value > p[p.stat]
												? 'player-pick-good-value'
												: 'player-pick-pending-value'
										}
									>
										{p[p.stat]}
									</strong>
								</h6>
								<>
									<h6 id={p.playerId}>
										{p.game} <small>({Moment(p.date).format('M-DD-YY h:mm a')})</small>
									</h6>
									{p.status === 'in play' ? (
										<>
											<h6 id={p.playerId}>
												{p.clock} - {quarters[p.quarter]}
											</h6>
											<h6 id={p.playerId}>{p.score}</h6>
										</>
									) : p.status === 'finished' ? (
										<h6 id={p.playerId}>{p.score}</h6>
									) : (
										<></>
									)}
								</>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
}

export default UserPlayerPicks;
