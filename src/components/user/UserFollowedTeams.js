import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import uuid from 'react-uuid';
import '../../styles/user/UserFollowing.css';

function UserFollowedTeams({ teams, navToTeam }) {
	if (!teams) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Card>
				<Card.Header className="following-header text-center">Followed Teams</Card.Header>
				<Card.Body>
					<ListGroup className="following-list-group" variant="flush">
						{teams.map((t, idx) => (
							<ListGroup.Item
								className="following-list-group-item"
								action
								key={uuid()}
								onClick={navToTeam}
								id={t.id}
							>
								<h5 className="text-center" id={t.id}>
									{t.name} ({t.wins} - {t.losses})
								</h5>
								<Stack id={t.id} direction="horizontal" gap={3}>
									<small className="mx-auto" id={t.id}>
										{t.conference}ern Conference
									</small>
									<div className="vr"></div>
									<small className="mx-auto" id={t.id}>
										{t.division} Division
									</small>
								</Stack>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
}

export default UserFollowedTeams;
