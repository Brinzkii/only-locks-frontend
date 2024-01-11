import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import SelectSearch from 'react-select-search';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import OnlyLocksAPI from './OnlyLocksAPI';
import Utils from './utils';
import 'react-select-search/style.css';

function PlayerPickForm() {
	const INITIAL_STATE = {
		players: undefined,
		games: undefined,
		selectedPlayer: null,
		selectedStat: undefined,
		overUnder: undefined,
		selectedValue: undefined,
		valueSelectIdx: undefined,
		gameId: undefined,
		selectOptions: undefined,
		pickOptions: undefined,
		pointValue: undefined,
	};

	const [data, setData] = useState(INITIAL_STATE);
	const handlePlayerSelection = (playerId) => {
		console.log('SELECTED:', data.players[playerId]);
		const gameId = data.players[playerId].gameId;
		setData({
			...data,
			selectedPlayer: playerId,
			gameId,
			overUnder: undefined,
			selectedValue: undefined,
			valueSelectIdx: undefined,
		});
	};
	const handleStatSelection = (stat) => {
		setData({
			...data,
			selectedStat: stat,
			pickOptions: undefined,
			overUnder: undefined,
			selectedValue: undefined,
			valueSelectIdx: undefined,
		});
	};
	const handleOverUnderSelection = (overUnder) => {
		const avg = data.players[data.selectedPlayer][data.selectedStat];
		const stat = data.selectedStat;
		const pickOptions = Utils.generatePickOptions(stat, avg);
		setData({ ...data, overUnder, pickOptions, selectedValue: undefined, valueSelectIdx: undefined });
	};
	const handleValueSelection = (idx) => {
		const choice = idx || 0;
		const selectedValue = data.pickOptions[choice].name;
		const pointValue = Utils.calcPlayerPickPointValue(data.selectedStat, data.overUnder, choice);
		setData({ ...data, selectedValue, pointValue, valueSelectIdx: choice });
		console.log('DATA AFTER SELECTION:', { ...data, selectedValue, pointValue, valueSelectIdx: choice });
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log(evt);
	};

	useEffect(() => {
		async function getData() {
			let games = {};
			const gamesRes = await OnlyLocksAPI.gamesByDate(Moment().format('YYYYMMDD'));
			for (let game of gamesRes) {
				games[game.id] = game;
			}
			const players = await OnlyLocksAPI.playerPickData(gamesRes);
			let selectOptions = [];
			Object.keys(players).map((key) => {
				selectOptions.push({ name: players[key].name, value: key });
			});
			setData({
				players,
				games,
				selectOptions,
				selectedPlayer: undefined,
				selectedStat: undefined,
				gameId: undefined,
			});
		}
		getData();
	}, []);

	return (
		<Form className="PlayerPickForm text-center" onSubmit={handleSubmit}>
			{data.selectedPlayer ? (
				<Form.Text className="PlayerPickForm-game-details mb-4">
					<Stack>
						<div>
							{data.games[data.gameId].homeCode} vs. {data.games[data.gameId].awayCode}
						</div>
						<div>{data.games[data.gameId].location}</div>
						<div>{Moment(data.games[data.gameId].date).format('LLL')}</div>
					</Stack>
				</Form.Text>
			) : (
				<></>
			)}

			{data.selectOptions ? (
				<SelectSearch
					options={data.selectOptions}
					value={data.selectedPlayer}
					name="players"
					placeholder="Select a player"
					search={true}
					onChange={handlePlayerSelection}
				/>
			) : (
				<Spinner animation="border" variant="info" />
			)}

			{data.selectedPlayer ? (
				<>
					<SelectSearch
						options={[
							{ name: 'Points', value: 'points' },
							{ name: 'Threes', value: 'tpm' },
							{ name: 'Assists', value: 'assists' },
							{ name: 'Rebounds', value: 'rebounds' },
							{ name: 'Steals', value: 'steals' },
							{ name: 'Blocks', value: 'blocks' },
						]}
						value={data.selectedStat}
						placeholder="Stat Category"
						onChange={handleStatSelection}
					/>
					<SelectSearch
						options={[
							{ name: 'OVER', value: 'over' },
							{ name: 'UNDER', value: 'under' },
						]}
						onChange={handleOverUnderSelection}
						value={data.overUnder}
						placeholder="Over / Under"
					/>
				</>
			) : (
				<></>
			)}

			{data.pickOptions ? (
				<>
					<SelectSearch
						options={data.pickOptions}
						value={data.valueSelectIdx}
						placeholder="Value"
						onChange={handleValueSelection}
					/>
				</>
			) : (
				<></>
			)}

			{data.selectedValue ? <Button type="submit">Lock it in!</Button> : <></>}
		</Form>
	);
}

export default PlayerPickForm;
