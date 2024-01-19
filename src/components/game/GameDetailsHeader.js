import React from 'react';
import Moment from 'moment';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import '../../styles/game/GameDetailsHeader.css';

function GameDetailsHeader({ game, homeRecord, awayRecord, quarters, navToTeam }) {
	return (
		<Card className="game-details-header mt-2 mx-auto">
			<Card.Header className="game-details-header-box" id={game.id}>
				<Stack className="game-details-header-logos-container" direction="horizontal" id={game.id}>
					<Row id={game.id} className="game-details-header-logos-row align-items-center">
						<Col id={game.homeId} className="mb-auto mt-auto">
							<Image
								id={game.homeId}
								className="game-details-header-logo GameList-logo-home"
								src={game.homeLogo}
								onClick={navToTeam}
							/>
							<h2 className="game-details-header-team mb-0">{game.homeName}</h2>
							<h5>
								<small id={game.homeId} className="mt-0">
									({homeRecord})
								</small>
							</h5>
						</Col>

						<Col className="game-details-header-vs-col" id={game.id}>
							{game.status === 'scheduled' ? (
								<Stack className="mx-auto" id={game.id}>
									<div id={game.id} className="game-details-header-clock">
										{Moment(game.date).format('MMMM Do h:mm a')}
									</div>
									<div id={game.id} className="game-details-header-location">
										{game.location}
									</div>
								</Stack>
							) : game.status === 'in play' ? (
								<Stack className="mx-auto" gap={1} id={game.id}>
									<div id={game.id} className="game-details-header-clock">
										{game.clock} - {quarters[game.quarter]} Qtr
									</div>
									<div id={game.id} className="game-details-header-score">
										{game.score}
									</div>
								</Stack>
							) : (
								<Stack direction="vertical" gap={1} id={game.id}>
									<div id={game.id} className="game-details-header-clock">
										Final
									</div>
									<div id={game.id} className="game-details-header-score">
										{game.score}
									</div>
									<div className="game-details-header-date">{Moment(game.date).format('LL')}</div>
								</Stack>
							)}
						</Col>

						<Col className="ms-auto" id={game.awayId}>
							<Image
								id={game.awayId}
								className="game-details-header-logo GameList-logo-away"
								src={game.awayLogo}
								onClick={navToTeam}
							/>
							<h2 className="game-details-header-team mb-0">{game.awayName}</h2>
							<h5>
								<small id={game.awayId} className="mt-0">
									({awayRecord})
								</small>
							</h5>
						</Col>
					</Row>
				</Stack>
			</Card.Header>
		</Card>
	);
}

export default GameDetailsHeader;
