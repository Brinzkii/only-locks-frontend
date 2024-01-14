import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

function GamePicks({ picks }) {
	if (!picks) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<ListGroup horizontal>
				{picks.map((p) => (
					<ListGroup.Item>{p.username}</ListGroup.Item>
				))}
			</ListGroup>
		);
	}
}

export default GamePicks;
