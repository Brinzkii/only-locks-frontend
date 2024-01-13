import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { HourglassSplit, Trophy, XCircle } from 'react-bootstrap-icons';
import Moment from 'moment';
import uuid from 'react-uuid';
import '../../styles/user/UserPicks.css';

function UserTeamPicks({ picks, navToTeam, navToGame, quarters }) {
	if (!picks) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Card>
				<Card.Header className="pick-header text-center">
					Team Picks <small>({picks.teamPickRecord})</small>
				</Card.Header>
				<Card.Body>
					<ListGroup variant="flush" className="pick-list-group text-center">
						{picks.teamPicks.map((p, idx) =>
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
										{p.selected} TO WIN -{' '}
										{p.isLeading ? (
											<Badge pill bg="success">
												<HourglassSplit className="pick-good-value"></HourglassSplit>
											</Badge>
										) : (
											<Badge pill bg="danger">
												<HourglassSplit className="pick-bad-value"></HourglassSplit>
											</Badge>
										)}
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
										<h4 className="pick-win-text text-center mx-auto" id={p.gameId}>
											<Trophy className="mx-auto"></Trophy> <small>+{p.pointValue || 0}pts</small>
										</h4>
									) : (
										<h4 className="pick-loss-text text-center" id={p.gameId}>
											<XCircle></XCircle>
										</h4>
									)}
									<h6 id={p.gameId}>{p.selected} TO WIN</h6>
									<>
										<h6 id={p.gameId}>{p.game}</h6>
										<h6>{p.score}</h6>
										<h6 id={p.gameId}>
											<small>
												{p.location} - ({Moment(p.date).format('M-DD-YY')})
											</small>
										</h6>
									</>
								</ListGroup.Item>
							) : (
								// Pending pick

								<ListGroup.Item
									action
									onClick={navToTeam}
									id={p.selectedId}
									className="pick-pending"
									key={uuid()}
								>
									<h6 id={p.selectedId}>{p.selected} TO WIN</h6>
									<>
										<h6 id={p.selectedId}>
											{p.game}{' '}
											<small id={p.selectedId}>({Moment(p.date).format('MMM Do h:mm a')})</small>
										</h6>
										<h6 id={p.selectedId}>
											<small id={p.selectedId}>{p.location}</small>
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

export default UserTeamPicks;
