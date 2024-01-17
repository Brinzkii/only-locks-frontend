import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityPlayerPick from '../picks/CommunityPlayerPick';
import CommunityTeamPick from '../picks/CommunityTeamPick';
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from '../Loading';
import '../../styles/game/GamePicks.css';
import uuid from 'react-uuid';

function GamePicks({ picks, quarters, navToPlayer }) {
	const navigate = useNavigate();
	const navToUser = (evt) => {
		navigate(`/users/${evt.target.id}`);
	};
	if (!picks) {
		return <Loading />;
	} else {
		return (
			<div className="game-picks mt-4 mx-auto">
				<h4>
					Community Picks{' '}
					{picks.communityRecord.wins > 0 || picks.communityRecord.losses > 0
						? `(${picks.communityRecord.wins} - ${picks.communityRecord.losses})`
						: null}
				</h4>
				<ListGroup horizontal className="game-picks-group mx-auto">
					{picks.picks.map((p) => {
						if (p.playerId) {
							return <CommunityPlayerPick key={uuid()} pick={p} navToUser={navToUser} />;
						} else {
							return <CommunityTeamPick key={uuid()} pick={p} navToUser={navToUser} />;
						}
					})}
				</ListGroup>
			</div>
		);
	}
}

export default GamePicks;
