import React from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import GameCard from '../game/GameCard';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import uuid from 'react-uuid';
import '../../styles/game/GameList.css';

function GameList({ data, setData, quarters }) {
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
			const currDay = data.date;
			const prevDay = Moment(currDay).subtract(1, 'days').format('YYYYMMDD');
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
	console.log('GAMES:', data.games);
	if (data.games === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="gamelist text-center">
				<h2 className="gamelist-date-header mt-4">{Moment(data.date).format('LL')}</h2>
				<Row className="mt-3">
					<Col></Col>
					<Col>
						<Button className="pb-2" onClick={handlePrevClick}>
							<CaretLeftFill></CaretLeftFill>
						</Button>
					</Col>
					<Col xs>
						<Form.Control
							type="date"
							value={Moment(data.date).format('YYYY-MM-DD')}
							onChange={handleDateSelection}
						/>
					</Col>
					<Col>
						<Button className="pb-2" onClick={handleNextClick}>
							<CaretRightFill></CaretRightFill>
						</Button>
					</Col>
					<Col></Col>
				</Row>

				<ListGroup className="gamelist-list-group mt-3 mx-auto">
					{data.games.map((g) => (
						<ListGroup.Item className="gamelist-list-group-item mx-auto" key={uuid()}>
							<GameCard
								game={g}
								navToGame={navToGame}
								navToTeam={navToTeam}
								quarters={quarters}
								key={uuid()}
							/>
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>
		);
	}
}

export default GameList;
