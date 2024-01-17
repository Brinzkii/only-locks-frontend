import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import SelectSearch from 'react-select-search';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import Utils from '../../utils/utils';
import '../../styles/picks/PickForm.css';

function PlayerPickForm({ notifySuccess, notifyError }) {
	const INITIAL_STATE = {
		games: undefined,
		players: undefined,
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
	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const pick = {
				username: localStorage.username,
				playerId: data.selectedPlayer,
				gameId: data.gameId,
				stat: data.selectedStat,
				over_under: data.overUnder,
				value: data.selectedValue,
				point_value: data.pointValue,
			};

			const pickRes = await OnlyLocksAPI.playerPick(pick);
			console.log('PICK:', pickRes);
			const msg = `Your ${data.players[pick.playerId].name} ${pick.over_under.toUpperCase()} ${pick.value} ${
				pick.stat
			} pick has been locked in!`;
			setData({
				...data,
				selectedPlayer: null,
				selectedStat: undefined,
				overUnder: undefined,
				selectedValue: undefined,
				valueSelectIdx: undefined,
				gameId: undefined,
				pickOptions: undefined,
				pointValue: undefined,
			});
			notifySuccess(msg);
		} catch (err) {
			notifyError(err);
		}
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
		<Form className="pick-form text-center" onSubmit={handleSubmit}>
			{data.selectedPlayer ? (
				<Form.Text className="pick-form-pick-details mb-4">
					<Stack className="pick-form-pick-details-stack mx-auto">
						<div className="pick-form-pick-details-header">Pick Details</div>
						<div>
							{data.players[data.selectedPlayer].name}{' '}
							{data.overUnder ? data.overUnder.toUpperCase() : ''}{' '}
							{data.selectedValue ? `${data.selectedValue} ${data.selectedStat}` : ''}
						</div>
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
					placeholder="Pick a player"
					search={true}
					onChange={handlePlayerSelection}
					emptyMessage={'Sorry, there are no eligible players to pick!'}
				/>
			) : (
				<Spinner animation="border" variant="primary" />
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

			{data.selectedValue ? (
				<Button type="submit" className="mt-3">
					Lock it in!
				</Button>
			) : (
				<></>
			)}
		</Form>
	);
}

export default PlayerPickForm;
