import React from 'react';
import Moment from 'moment';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/game/GameCard.css';

function GameCard({ game, navToGame, navToTeam, quarters }) {
	return (
		<Card className="gamecard mt-2 mx-auto">
			<Card.Header>
				<Stack className="gamecard-logos-container" direction="horizontal">
					<Row className="gamecard-logos-row">
						<Col>
							<Image
								id={game.homeId}
								onClick={navToTeam}
								className="gamecard-logo GameList-logo-home"
								src={game.homeLogo}
							/>
							<h5 className="mb-0">{game.homeName}</h5>
							<small className="mt-0">({game.homeRecord})</small>
						</Col>

						<Col className="gamecard-vs-col">
							<small className="gamecard-vs-text ms-auto">vs</small>
						</Col>

						<Col className="ms-auto">
							<Image
								id={game.awayId}
								onClick={navToTeam}
								className="gamecard-logo GameList-logo-away"
								src={game.awayLogo}
							/>
							<h5 className="mb-0">{game.awayName}</h5>
							<small className="mt-0">({game.awayRecord})</small>
						</Col>
					</Row>
				</Stack>
			</Card.Header>
			<Card.Body id={game.id} onClick={navToGame}>
				<Card.Title id={game.id}>
					{game.status === 'scheduled' ? (
						Moment(game.date).format('LT')
					) : game.status === 'in play' ? (
						<>
							<>
								{game.clock} - {quarters[game.quarter]}
							</>
							<>
								<small>{game.homeCode}</small> {game.score} <small>{game.awayCode}</small>
							</>
						</>
					) : (
						<>
							<small>{game.homeCode}</small> {game.score} <small>{game.awayCode}</small>
						</>
					)}
				</Card.Title>
				<Card.Text id={game.id}>
					<>{game.location}</>
				</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default GameCard;
