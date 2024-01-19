import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import PlayerPick from '../picks/PlayerPick';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import uuid from 'react-uuid';
import '../../styles/user/UserPicks.css';

function UserPlayerPicks({ picks, quarters, navToPlayer, navToGame }) {
	if (!picks) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Card className="pick-card">
				<Card.Header className="pick-header text-center">
					Player Picks <small>({picks.playerPickRecord})</small>
				</Card.Header>
				<Card.Body>
					<ListGroup className="pick-list-group text-center">
						{picks.playerPicks.map((p, idx) => (
							<PlayerPick
								key={uuid()}
								pick={p}
								navToPlayer={navToPlayer}
								navToGame={navToGame}
								quarters={quarters}
							/>
						))}
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
}

export default UserPlayerPicks;
