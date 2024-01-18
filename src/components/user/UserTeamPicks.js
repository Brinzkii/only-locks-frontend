import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import TeamPick from '../picks/TeamPick';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
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
					<ListGroup className="pick-list-group text-center">
						{picks.teamPicks.map((p, idx) => (
							<TeamPick
								key={uuid()}
								pick={p}
								navToTeam={navToTeam}
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

export default UserTeamPicks;
