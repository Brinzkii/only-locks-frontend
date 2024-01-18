import React from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import GameCard from '../game/GameCard';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Loading from '../Loading';
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
	if (data.games === undefined || !data.games.length) {
		return <Loading size="100px" />;
	} else {
		return (
			<div className="gamelist text-center mx-auto mb-3">
				<h2 className="gamelist-date-header mt-4">{Moment(data.date).format('LL')}</h2>
				<Stack direction="horizontal" gap={0}>
					<Button className="pb-2 mx-auto" onClick={handlePrevClick}>
						<CaretLeftFill></CaretLeftFill>
					</Button>
					<Form.Control
						className="player-list-date-picker"
						type="date"
						value={Moment(data.date).format('YYYY-MM-DD')}
						onChange={handleDateSelection}
					/>
					<Button className="pb-2 mx-auto" onClick={handleNextClick}>
						<CaretRightFill></CaretRightFill>
					</Button>
				</Stack>

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
