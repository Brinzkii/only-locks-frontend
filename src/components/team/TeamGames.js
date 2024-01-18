import React from 'react';
import Moment from 'moment';
import Loading from '../Loading';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../../styles/team/TeamGames.css';

function TeamGames({ team, games, navToGame, navToTeam, data, setData }) {
	const handleClick = (evt) => {
		if (Number(evt.target.id) !== team.id) {
			setData({ ...data, team: undefined });
			navToTeam(evt);
		}
	};
	if (!games || !team) {
		return <Loading size="100px" />;
	} else {
		return (
			<Stack gap={4}>
				{games.map((g) => {
					return (
						<Card
							className={`team-games-card ${
								g.winner === team.id
									? 'team-games-card-win mx-auto'
									: g.winner === null
									? 'mx-auto'
									: 'team-games-card-loss mx-auto'
							}`}
						>
							<Card.Header>
								<Stack className="gamecard-logos-container" direction="horizontal">
									<Row className="gamecard-logos-row align-items-center">
										<Col>
											<Image
												id={g.home.id}
												className="team-games-logo GameList-logo-home"
												src={g.home.logo}
												onClick={handleClick}
											/>
										</Col>

										<Col className="gamecard-vs-col">
											<h5>vs</h5>
										</Col>

										<Col className="ms-auto">
											<Image
												id={g.away.id}
												className="team-games-logo GameList-logo-away"
												src={g.away.logo}
												onClick={handleClick}
											/>
										</Col>
									</Row>
								</Stack>
							</Card.Header>
							<Card.Body className="team-games-card-body" id={`${g.id}`} onClick={navToGame}>
								<Card.Title id={`${g.id}`}>
									{g.score === 'TBD' ? Moment(g.date).format('MMMM Do h:mm a') : g.score}
								</Card.Title>
								<Card.Text id={`${g.id}`}>
									{g.location} <br />
									{Moment(g.date).format('LLL')}
								</Card.Text>
							</Card.Body>
						</Card>
					);
				})}
			</Stack>
		);
	}
}

export default TeamGames;
