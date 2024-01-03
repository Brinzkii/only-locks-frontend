import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import './GameList.css';

function GameList() {
	const [games, setGames] = useState(undefined);
	const [day, setDay] = useState(Moment().format('l').replaceAll('/', '-'));
	console.debug('Games', games);
	function handlePrevClick() {
		async function prevDayGames() {
			setGames(undefined);
			const prev = Moment(day).subtract(1, 'days').format('l').replaceAll('/', '-');
			console.log('Prev:', prev);
			setDay(prev);
			let games = await OnlyLocksAPI.gamesByDate(day);
			setGames(games);
		}
		prevDayGames();
	}
	function handleNextClick() {
		async function nextDayGames() {
			setGames(undefined);
			const next = Moment(day).add(1, 'days').format('l').replaceAll('/', '-');
			console.log('Next:', next);
			setDay(next);
			let games = await OnlyLocksAPI.gamesByDate(day);
			setGames(games);
		}
		nextDayGames();
	}
	useEffect(() => {
		async function getGames() {
			let games = await OnlyLocksAPI.gamesByDate('today');
			setGames(games);
		}
		getGames();
	}, []);
	if (games === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="GameList">
				<Container>
					<h2 className="GameList-date-header mt-4">{Moment(day).format('LL')}</h2>
					<Stack direction="horizontal">
						<Button onClick={handlePrevClick}>Prev</Button>
						<Button onClick={handleNextClick}>Next</Button>
					</Stack>
					<ul className="GameList-list m-0 p-0">
						{games.map((g) => (
							<li GameList-list-item>
								<Stack className="GameList-logos-container" direction="horizontal">
									<Link to={`/teams/${g.homeId}`}></Link>
									<Image className="GameList-logo GameList-logo-home" src={g.homeLogo} />
									<Image className="GameList-logo GameList-logo-away" src={g.awayLogo} />
								</Stack>

								<Card className="GameList-card mt-2" style={{ width: '70%' }}>
									<Card.Body>
										<Card.Title>
											{g.homeCode} vs. {g.awayCode}
										</Card.Title>
										<Card.Text>
											The {g.awayName} are taking on the {g.homeName} at {g.location}
										</Card.Text>
									</Card.Body>
								</Card>
							</li>
						))}
					</ul>
				</Container>
			</div>
		);
	}
}

export default GameList;
