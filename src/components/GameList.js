import React from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from '../api/OnlyLocksAPI';
import GameCard from './GameCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import uuid from 'react-uuid';
import '../styles/GameList.css';

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
			const prevDay = Moment(currDay).subtract(1, 'days').format('YYYYMMDD');
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
			const nextDay = Moment(currDay).add(1, 'days').format('YYYYMMDD');
			console.log('Next:', nextDay);
			let games = await OnlyLocksAPI.gamesByDate(nextDay);
			setData({ ...data, games, date: nextDay });
		}
		nextDayGames();
	}
	function handleDateSelection(evt) {
		async function getGames(date) {
			setData({ ...data, games: undefined });
			let games = await OnlyLocksAPI.gamesByDate(date);
			setData({ ...data, date: Moment(date), games });
		}
		getGames(Moment(evt.target.value).format('YYYYMMDD'));
	}
	if (data.games === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="GameList">
				<Container>
					<h2 className="GameList-date-header mt-4">{Moment(data.date).format('LL')}</h2>
					<Row>
						<Col></Col>
						<Col>
							<Button onClick={handlePrevClick}>Prev</Button>
						</Col>
						<Col xs>
							<Form.Control
								type="date"
								value={Moment(data.date).format('YYYY-MM-DD')}
								onChange={handleDateSelection}
							/>
						</Col>
						<Col>
							<Button onClick={handleNextClick}>Next</Button>
						</Col>
						<Col></Col>
					</Row>
					<ul className="GameList-list m-0 p-0">
						{data.games.map((g) => (
							<GameCard game={g} navToGame={navToGame} navToTeam={navToTeam} key={uuid()} />
						))}
					</ul>
				</Container>
			</div>
		);
	}
}

export default GameList;
