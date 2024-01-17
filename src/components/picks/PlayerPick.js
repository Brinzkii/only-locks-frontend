import React from 'react';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Trophy, XCircle } from 'react-bootstrap-icons';
import Moment from 'moment';
import uuid from 'react-uuid';
import '../../styles/user/UserPicks.css';

function PlayerPick({ pick, quarters, navToPlayer, navToGame }) {
	return pick.status === 'in play' ? (
		// Live pick

		<ListGroup.Item action onClick={navToGame} id={pick.gameId} className="pick-pending" key={uuid()}>
			<h6 id={pick.gameId}>
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
			<>
				<h6 id={pick.gameId}>
					{pick.clock} - {quarters[pick.quarter]}
				</h6>
				<h6 id={pick.gameId}>{pick.score}</h6>
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
				<h4 className="pick-win-text text-center" id={pick.gameId}>
					<Stack>
						<Trophy className="pick-win-trophy mx-auto"></Trophy>
						<small>+{pick.pointValue}pts</small>
					</Stack>
				</h4>
			) : (
				<h4 className="pick-loss-text text-center" id={pick.gameId}>
					<XCircle></XCircle>
				</h4>
			)}
			<h6 id={pick.gameId}>
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
			<>
				<h6 id={pick.gameId}>{pick.score}</h6>
				<h6 id={pick.gameId}>
					<small>
						{pick.location} - ({Moment(pick.date).format('M/DD/YY')})
					</small>
				</h6>
			</>
		</ListGroup.Item>
	) : (
		// Pending pick

		<ListGroup.Item action onClick={navToPlayer} id={pick.playerId} className="pick-pending" key={uuid()}>
			<h6 id={pick.playerId}>
				{pick.player} {pick.overUnder} {pick.value} {pick.stat === 'tpm' ? 'threes' : pick.stat}
			</h6>
			<>
				<h6 id={pick.playerId}>
					{pick.game}
					<small>({Moment(pick.date).format('MMM Do h:mm a')})</small>
				</h6>
				<h6 id={pick.gameId}>
					<small>{pick.location}</small>
				</h6>
			</>
		</ListGroup.Item>
	);
}

export default PlayerPick;
