import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import PlayerStatsTable from './PlayerStatsTable';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import uuid from 'react-uuid';
import './TeamGame.css';

function TeamGames({ team, games }) {
	const navigate = useNavigate();
	const navToGame = (evt) => {
		console.log('EVT TARGET', evt.target);
		navigate(`/games/${evt.target.id}`);
	};
	const navToTeam = (evt) => {
		console.log('EVT TARGET ID', evt.target.id);
		navigate(`/teams/${evt.target.id}`);
	};
	if (!games) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return games.map((g) => {
			return (
				<Stack direction="vertical">
					<Card
						className={`TeamGame-card mt-2 ${
							g.winner === team.id ? 'TeamGame-card-win' : g.winner === null ? '' : 'TeamGame-card-loss'
						}`}
						style={{ width: '70%' }}
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
				</Stack>
			);
		});
	}
}

export default TeamGames;
