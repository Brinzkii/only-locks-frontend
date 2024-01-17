import React from 'react';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Trophy, XCircle } from 'react-bootstrap-icons';
import Moment from 'moment';
import uuid from 'react-uuid';
import '../../styles/picks/CommunityPick.css';

function TeamPick({ pick, navToTeam, navToGame, quarters }) {
	return pick.status === 'in play' ? (
		// Live pick

		<ListGroup.Item action onClick={navToGame} id={pick.gameId} className="pick-pending" key={uuid()}>
			<h6 id={pick.gameId}>
				{pick.selected} TO WIN -{' '}
				{pick.isLeading ? (
					<Badge pill bg="success">
						<strong>+{pick.difference}</strong>
					</Badge>
				) : (
					<Badge pill bg="danger">
						<strong>{pick.difference}</strong>
					</Badge>
				)}
			</h6>
			<>
				<h6 id={pick.gameId}>
					{pick.clock} - {quarters[pick.quarter]}
				</h6>

				<h6 id={pick.gameId}>{pick.displayScore}</h6>
			</>
		</ListGroup.Item>
	) : pick.status === 'finished' ? (
		// Finished pick

		<ListGroup.Item
			action
			onClick={navToGame}
			id={pick.gameId}
			className={pick.result === true ? 'pick-winner' : 'pick-loser'}
			key={uuid()}
		>
			{pick.result === true ? (
				<h4 className="pick-win-text text-center mx-auto" id={pick.gameId}>
					<Stack>
						<Trophy className="mx-auto"></Trophy> <small>+{pick.pointValue || 0}pts</small>
					</Stack>
				</h4>
			) : (
				<h4 className="pick-loss-text text-center" id={pick.gameId}>
					<XCircle></XCircle>
				</h4>
			)}
			<h6 id={pick.gameId}>{pick.selected} TO WIN</h6>
			<>
				<h6>{pick.displayScore}</h6>
				<h6 id={pick.gameId}>
					<small>
						{pick.location} - ({Moment(pick.date).format('M/DD/YY')})
					</small>
				</h6>
			</>
		</ListGroup.Item>
	) : (
		// Pending pick

		<ListGroup.Item action onClick={navToTeam} id={pick.selectedId} className="pick-pending" key={uuid()}>
			<h6 id={pick.selectedId}>{pick.selected} TO WIN</h6>
			<>
				<h6 id={pick.selectedId}>
					{pick.game} <small id={pick.selectedId}>({Moment(pick.date).format('MMM Do h:mm a')})</small>
				</h6>
				<h6 id={pick.selectedId}>
					<small id={pick.selectedId}>{pick.location}</small>
				</h6>
			</>
		</ListGroup.Item>
	);
}

export default TeamPick;
