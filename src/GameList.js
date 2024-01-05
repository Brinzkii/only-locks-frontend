import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';
import './GameList.css';

function GameList({ data, setData }) {
	console.debug('Games', data.games);
	function handlePrevClick() {
		async function prevDayGames() {
			setData({ ...data, games: undefined });
			console.debug('Games', data.games);
			const currDay = data.date;
			const prevDay = Moment(currDay).subtract(1, 'days').format('l').replaceAll('/', '-');
			console.log('Prev:', prevDay);
			let games = await OnlyLocksAPI.gamesByDate(prevDay);
			setData({ ...data, games, date: prevDay });
		}
		prevDayGames();
	}
	function handleNextClick() {
		async function nextDayGames() {
			setData({ ...data, games: undefined });
			console.debug('Games', data.games);
			const currDay = data.date;
			const nextDay = Moment(currDay).add(1, 'days').format('l').replaceAll('/', '-');
			console.log('Next:', nextDay);
			let games = await OnlyLocksAPI.gamesByDate(nextDay);
			setData({ ...data, games, date: nextDay });
		}
		nextDayGames();
	}
	if (data.games === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="GameList">
				<Container>
					<h2 className="GameList-date-header mt-4">{Moment(data.date).format('LL')}</h2>
					<Stack direction="horizontal">
						<Button onClick={handlePrevClick}>Prev</Button>
						<Button onClick={handleNextClick}>Next</Button>
					</Stack>
					<ul className="GameList-list m-0 p-0">
						{data.games.map((g) => (
							<li className="GameList-list-item" key={uuid()}>
								<Stack className="GameList-logos-container" direction="horizontal">
									<Link to={`/teams/${g.homeId}`}>
										<Image className="GameList-logo GameList-logo-home" src={g.homeLogo} />
									</Link>
									<Link to={`/teams/${g.awayId}`}>
										<Image className="GameList-logo GameList-logo-away" src={g.awayLogo} />
									</Link>
								</Stack>

								<Link to={`/games/${g.id}`}>
									<Card className="GameList-card mt-2" style={{ width: '70%' }}>
										<Card.Body>
											<Card.Title>
												{g.homeCode} vs. {g.awayCode}
											</Card.Title>
											<Card.Text>
												The {g.awayName} are taking on the {g.homeName} at the {g.location}
											</Card.Text>
										</Card.Body>
									</Card>
								</Link>
							</li>
						))}
					</ul>
				</Container>
			</div>
		);
	}
}

export default GameList;
