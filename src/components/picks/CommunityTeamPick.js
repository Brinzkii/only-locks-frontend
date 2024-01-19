import React from 'react';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Trophy, XCircle } from 'react-bootstrap-icons';
import uuid from 'react-uuid';
import '../../styles/user/UserPicks.css';
import '../../styles/picks/CommunityPick.css';

function CommunityTeamPick({ pick, navToUser }) {
	return pick.status === 'in play' ? (
		// Live pick

		<ListGroup.Item
			action
			onClick={navToUser}
			id={pick.username}
			className="pick-pending community-pick"
			key={uuid()}
		>
			<Stack id={pick.username} gap={1} className="community-pick-stack align-items-center">
				<h6 id={pick.gameId}>
					{pick.selectedCode} TO WIN -{' '}
					{pick.isLeading ? (
						<Badge id={pick.username} pill bg="success">
							<strong>+{pick.difference}</strong>
						</Badge>
					) : (
						<Badge id={pick.username} pill bg="danger">
							<strong>{pick.difference}</strong>
						</Badge>
					)}
				</h6>
				<h6 className="community-pick-user" id={pick.username}>
					Placed by: {pick.username}
				</h6>
			</Stack>
		</ListGroup.Item>
	) : pick.status === 'finished' ? (
		// Finished pick

		<ListGroup.Item
			action
			onClick={navToUser}
			id={pick.username}
			className={pick.result === true ? 'pick-winner community-pick' : 'pick-loser community-pick'}
			key={uuid()}
		>
			<Stack id={pick.username} gap={1} className="community-pick-stack align-items-center">
				{pick.result === true ? (
					<h4 className="pick-win-text text-center mx-auto" id={pick.username}>
						<Stack id={pick.username}>
							<Trophy id={pick.username} className="mx-auto"></Trophy>{' '}
							<small id={pick.username}>+{pick.pointValue || 0}pts</small>
						</Stack>
					</h4>
				) : (
					<h4 className="pick-loss-text text-center" id={pick.username}>
						<XCircle></XCircle>
					</h4>
				)}
				<h6 id={pick.username}>{pick.selectedCode} TO WIN</h6>
				<h6 className="community-pick-user" id={pick.username}>
					Placed by: {pick.username}
				</h6>
			</Stack>
		</ListGroup.Item>
	) : (
		// Pending pick

		<ListGroup.Item
			action
			onClick={navToUser}
			id={pick.username}
			className="pick-pending community-pick"
			key={uuid()}
		>
			<Stack id={pick.username} gap={1} className="community-pick-stack align-items-center">
				<h6 id={pick.username}>{pick.selectedCode} TO WIN</h6>
				<h6 className="community-pick-user" id={pick.username}>
					Placed by: {pick.username}
				</h6>
			</Stack>
		</ListGroup.Item>
	);
}

export default CommunityTeamPick;
