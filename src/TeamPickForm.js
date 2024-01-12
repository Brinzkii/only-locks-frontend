import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import SelectSearch from 'react-select-search';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import OnlyLocksAPI from './OnlyLocksAPI';
import Utils from './utils';
import 'react-select-search/style.css';

function TeamPickForm() {
	const INITIAL_STATE = {
		teams: undefined,
		games: undefined,
		selectedTeam: undefined,
		gameId: undefined,
		selectOptions: undefined,
	};
	const [data, setData] = useState(INITIAL_STATE);
	const handleTeamSelection = (teamId) => {
		console.log(teamId);
		setData({ ...data, selectedTeam: teamId });
	};
	useEffect(() => {
		async function getData() {
			let games = {};
			let teams = {};
			const gamesRes = await OnlyLocksAPI.gamesByDate(Moment().format('YYYYMMDD'));
			for (let game of gamesRes) {
				games[game.id] = game;
				const t1 = await OnlyLocksAPI.team(game.awayId);
				const t2 = await OnlyLocksAPI.team(game.homeId);
				teams[t1.id] = t1;
				teams[t2.id] = t2;
			}
			let selectOptions = [];
			Object.keys(teams).map((key) => {
				selectOptions.push({ name: teams[key].name, value: key });
			});
			setData({
				teams,
				games,
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
		<Form className="TeamPickForm text-center">
			{data.selectedTeam ? (
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

			{data.selectedTeam ? <Button type="submit">Lock it in!</Button> : <></>}
		</Form>
	);
}

export default TeamPickForm;
