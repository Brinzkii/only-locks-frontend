import React from 'react';
import Moment from 'moment';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './PlayerInfoCard.css';

function PlayerInfoCard({ player, team, navToTeam }) {
	const positions = {
		'F-G': 'Forward/Guard',
		'C-F': 'Center/Forward',
		SG: 'Shooting Guard',
		'G-F': 'Guard/Forward',
		C: 'Center',
		SF: 'Small Forward',
		G: 'Guard',
		F: 'Forward',
		'F-C': 'Forward/Center',
	};
	return (
		<Card className="PlayerInfoCard">
			<Card.Img
				id={team.id}
				onClick={navToTeam}
				className="PlayerInfoCard-image mx-auto"
				variant="top"
				src={team.logo}
			/>
			<Card.Title className="mt-3 mb-0">
				{positions[player.position]} for the {team.name}
			</Card.Title>
			<Card.Body className="mt-0">
				<Stack className="" direction="vertical" gap={2}>
					<hr />
					<div className="">
						Age: {Moment(Moment(player.birthday).format('YYYYMMDD'), 'YYYYMMDD').fromNow().slice(0, 2)}
					</div>
					<div className="">Height: {player.height}</div>
					<div className="">Weight: {player.weight}</div>
					<div className="">College: {player.college}</div>
				</Stack>
			</Card.Body>
		</Card>
	);
}

export default PlayerInfoCard;
