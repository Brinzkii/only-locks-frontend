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
			<Card.Header id={game.id} onClick={navToGame}>
				<Stack className="gamecard-logos-container" direction="horizontal">
					<Row className="gamecard-logos-row align-items-center">
						<Col>
							<Image id={game.id} className="gamecard-logo GameList-logo-home" src={game.homeLogo} />
							<h5 id={game.id} className="mb-0">
								{game.homeName}
							</h5>
							<small id={game.id} className="mt-0">
								({game.homeRecord})
							</small>
						</Col>

						<Col className="gamecard-vs-col">
							{game.status === 'scheduled' ? (
								<Stack className="mx-auto">
									<div id={game.id} className="gamecard-clock">
										{Moment(game.date).format('LT')}
									</div>
									<div id={game.id} className="gamecard-location">
										{game.location}
									</div>
								</Stack>
							) : game.status === 'in play' ? (
								<Stack className="mx-auto" gap={1}>
									<div id={game.id} className="gamecard-clock">
										{game.clock} - {quarters[game.quarter]} Qtr
									</div>
									<div id={game.id} className="gamecard-score">
										{game.score}
									</div>
								</Stack>
							) : (
								<Stack direction="vertical" gap={1}>
									<div id={game.id} className="gamecard-clock">
										Final
									</div>
									<div id={game.id} className="gamecard-score">
										{game.score}
									</div>
								</Stack>
							)}
						</Col>

						<Col className="ms-auto">
							<Image id={game.id} className="gamecard-logo GameList-logo-away" src={game.awayLogo} />
							<h5 id={game.id} className="mb-0">
								{game.awayName}
							</h5>
							<small id={game.id} className="mt-0">
								({game.awayRecord})
							</small>
						</Col>
					</Row>
				</Stack>
			</Card.Header>
		</Card>
	);
}

export default GameCard;
