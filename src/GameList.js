import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import GameCard from './GameCard';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';
import './GameList.css';

function GameList({ data, setData }) {
	const navigate = useNavigate();
	const navToGame = (evt) => {
		console.log('GAME ID:', evt.target);
		navigate(`/games/${evt.target.id}`);
	};
	const navToTeam = (evt) => {
		navigate(`/teams/${evt.target.id}`);
	};
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
							<GameCard game={g} navToGame={navToGame} navToTeam={navToTeam} />
						))}
					</ul>
				</Container>
			</div>
		);
	}
}

export default GameList;
