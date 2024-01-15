import React from 'react';
import Moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import '../../styles/team/TeamGames.css';

function TeamGames({ team, games, navToGame, navToTeam }) {
	if (!games) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<Stack gap={4}>
				{games.map((g) => {
					return (
						<Card
							className={`TeamGame-card ${
								g.winner === team.id
									? 'TeamGame-card-win mx-auto'
									: g.winner === null
									? 'mx-auto'
									: 'TeamGame-card-loss mx-auto'
							}`}
						>
							<Card.Header>
								<Stack className="TeamGame-logos-container" direction="horizontal">
									<Image
										id={`${g.home.id}`}
										className="TeamGame-logo TeamGame-logo-home"
										onClick={navToTeam}
										src={g.home.logo}
									/>

									<h6 className="TeamGame-game-vs">&emsp;vs&emsp;</h6>

									<Image
										id={`${g.away.id}`}
										className="TeamGame-logo TeamGame-logo-away"
										onClick={navToTeam}
										src={g.away.logo}
									/>
								</Stack>
							</Card.Header>
							<Card.Body id={`${g.id}`} onClick={navToGame}>
								<Card.Title id={`${g.id}`}>
									{g.score === 'TBD' ? Moment(g.date).format('MMMM D h:mm a') : g.score}
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
