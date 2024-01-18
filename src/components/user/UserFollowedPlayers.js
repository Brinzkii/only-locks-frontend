import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import uuid from 'react-uuid';
import '../../styles/user/UserFollowing.css';

function UserFollowedPlayers({ players, navToPlayer }) {
	if (!players) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Card>
				<Card.Header className="following-header text-center">Followed Players</Card.Header>
				<Card.Body>
					<ListGroup className="following-list-group" variant="flush">
						{players.map((p, idx) => (
							<ListGroup.Item
								className="following-list-group-item"
								action
								key={uuid()}
								id={p.id}
								onClick={navToPlayer}
							>
								<h5 id={p.id}>
									{p.name} ({p.teamCode})
								</h5>
								<>
									<h6 className="text-center" id={p.id}>
										{p.teamName}
									</h6>
									<Stack direction="horizontal" id={p.id}>
										<h6 className="ms-auto">#{p.number || 0}</h6>
										<div></div>
										<h6 className="mx-auto">{p.position}</h6>
									</Stack>
									<hr className="mt-0" />
									<Stack id={p.id}>
										<Row id={p.id}>
											<Col id={p.id}>
												<h6 id={p.id}>{p.points} points</h6>
											</Col>
											<Col id={p.id}>
												<h6 id={p.id}>{p.tpm} threes</h6>
											</Col>
										</Row>
										<Row id={p.id}>
											<Col id={p.id}>
												<h6 id={p.id}>{p.assists} assists</h6>
											</Col>
											<Col id={p.id}>
												<h6 id={p.id}>{p.rebounds} reb.</h6>
											</Col>
										</Row>
										<Row id={p.id}>
											<Col id={p.id}>
												<h6 id={p.id}>{p.steals} steals</h6>
											</Col>
											<Col id={p.id}>
												<h6 id={p.id}>{p.blocks} blocks</h6>
											</Col>
										</Row>
									</Stack>
								</>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
}

export default UserFollowedPlayers;
