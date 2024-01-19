import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import SelectSearch from 'react-select-search';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';

function TeamPickForm({ notifySuccess, notifyError }) {
	const INITIAL_STATE = {
		games: undefined,
		pickOptions: undefined,
		selectedTeam: undefined,
		gameId: undefined,
		selectOptions: undefined,
	};
	const [data, setData] = useState(INITIAL_STATE);
	const handleTeamSelection = (teamId) => {
		console.log('SELECTED:', data.teams[teamId]);
		const gameId = data.teams[teamId].gameId;
		console.log('GAME INFO:', data.games[gameId].homeCode);
		console.log('GAME ID:', gameId);
		setData({ ...data, selectedTeam: teamId, gameId });
	};
	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const pick = await OnlyLocksAPI.teamPick({
				username: localStorage.username,
				teamId: data.selectedTeam,
				gameId: data.gameId,
			});
			console.log('PICK:', pick);
			const msg = `Your ${data.teams[data.selectedTeam].name} pick has been locked in!`;
			setData({ ...data, selectedTeam: undefined, gameId: undefined });
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
			let teams = await OnlyLocksAPI.teamPickData(gamesRes);
			let selectOptions = [];
			Object.keys(teams).map((key) => {
				selectOptions.push({ name: teams[key].name, value: key });
			});
			setData({
				games,
				teams,
				selectOptions,
				selectedTeam: undefined,
				gameId: undefined,
			});
			console.log({
				teams,
				games,
				selectOptions,
				selectedTeam: undefined,
				gameId: undefined,
			});
		}
		getData();
	}, []);
	return (
		<Form className="pick-form text-center" onSubmit={handleSubmit}>
			{data.selectedTeam ? (
				<Form.Text className="pick-form-pick-details mb-4">
					<Stack className="pick-form-pick-details-stack mx-auto mb-4">
						<div className="pick-form-pick-details-header">Pick Details</div>
						<div>
							{data.games[data.gameId].homeCode} vs. {data.games[data.gameId].awayCode}
						</div>
						<div>WINNER: {data.teams[data.selectedTeam].name}</div>
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
					value={data.selectedTeam}
					name="teams"
					placeholder="Pick a winner"
					search={true}
					onChange={handleTeamSelection}
					emptyMessage={'Sorry, all games for the day have started!'}
				/>
			) : (
				<Spinner animation="border" variant="info" />
			)}

			{data.selectedTeam ? (
				<Button type="submit" className="mt-3">
					Lock it in!
				</Button>
			) : (
				<></>
			)}
		</Form>
	);
}

export default TeamPickForm;
