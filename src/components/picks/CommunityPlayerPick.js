import React from 'react';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Trophy, XCircle } from 'react-bootstrap-icons';
import uuid from 'react-uuid';
import '../../styles/user/UserPicks.css';
import '../../styles/picks/CommunityPick.css';

function CommunityPlayerPick({ pick, navToPlayer, navToGame, navToUser }) {
	return pick.status === 'in play' ? (
		// Live pick

		<ListGroup.Item
			action
			onClick={navToUser}
			id={pick.username}
			className="pick-pending community-pick"
			key={uuid()}
		>
			<h6 id={pick.username}>
				{pick.player} {pick.overUnder} {pick.value} {pick.stat === 'tpm' ? 'threes' : pick.stat} -{' '}
				<Badge
					pill
					bg={
						!pick[pick.stat]
							? 'secondary'
							: pick.overUnder === 'OVER' && pick.value >= pick[pick.stat]
							? 'danger'
							: pick.overUnder === 'OVER' && pick.value < pick[pick.stat]
							? 'success'
							: pick.overUnder === 'UNDER' && pick.value <= pick[pick.stat]
							? 'danger'
							: pick.overUnder === 'UNDER' && pick.value > pick[pick.stat]
							? 'success'
							: 'warning'
					}
				>
					{pick[pick.stat] === undefined ? '?' : pick[pick.stat]}
				</Badge>
			</h6>
			<h6 id={pick.username}>Placed by: {pick.username}</h6>
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
			{pick.result === true ? (
				<h4 className="pick-win-text text-center" id={pick.username}>
					<Stack>
						<Trophy className="pick-win-trophy mx-auto"></Trophy>
						<small>+{pick.pointValue}pts</small>
					</Stack>
				</h4>
			) : (
				<h4 className="pick-loss-text text-center" id={pick.username}>
					<XCircle></XCircle>
				</h4>
			)}
			<h6 id={pick.username}>
				{pick.player} {pick.overUnder} {pick.value} {pick.stat === 'tpm' ? 'threes' : pick.stat} -{' '}
				<Badge
					pill
					bg={
						pick.overUnder === 'OVER' && pick.value >= pick[pick.stat]
							? 'danger'
							: pick.overUnder === 'OVER' && pick.value < pick[pick.stat]
							? 'success'
							: pick.overUnder === 'UNDER' && pick.value <= pick[pick.stat]
							? 'danger'
							: pick.overUnder === 'UNDER' && pick.value > pick[pick.stat]
							? 'success'
							: 'warning'
					}
				>
					{pick[pick.stat] === undefined ? 'DNP' : pick[pick.stat]}
				</Badge>
			</h6>
			<h6 id={pick.username}>Placed by: {pick.username}</h6>
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
			<h6 id={pick.username}>
				{pick.player} {pick.overUnder} {pick.value} {pick.stat === 'tpm' ? 'threes' : pick.stat}
			</h6>
			<h6 id={pick.username}>Placed by: {pick.username}</h6>
		</ListGroup.Item>
	);
}

export default CommunityPlayerPick;
