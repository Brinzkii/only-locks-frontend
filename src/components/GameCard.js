import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import uuid from 'react-uuid';
import '../styles/GameList.css';

function GameCard({ game, navToGame, navToTeam }) {
	return (
		<li className="GameList-list-item" key={uuid()}>
			<Stack className="GameList-logos-container" direction="horizontal">
				<Image
					id={game.homeId}
					onClick={navToTeam}
					className="GameList-logo GameList-logo-home"
					src={game.homeLogo}
				/>
				<Image
					id={game.awayId}
					onClick={navToTeam}
					className="GameList-logo GameList-logo-away"
					src={game.awayLogo}
				/>
			</Stack>

			<Card id={game.id} onClick={navToGame} className="GameList-card mt-2" style={{ width: '70%' }}>
				<Card.Body id={game.id}>
					<Card.Title id={game.id}>
						{game.homeCode} vs. {game.awayCode}
					</Card.Title>
					<Card.Text id={game.id}>
						The {game.awayName} are taking on the {game.homeName} at the {game.location}
					</Card.Text>
				</Card.Body>
			</Card>
		</li>
	);
}

export default GameCard;
