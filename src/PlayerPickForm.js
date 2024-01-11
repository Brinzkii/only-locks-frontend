import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import SelectSearch from 'react-select-search';
import Spinner from 'react-bootstrap/Spinner';
import OnlyLocksAPI from './OnlyLocksAPI';
import 'react-select-search/style.css';

function PlayerPickForm({ games }) {
	const INITIAL_STATE = {
		players: undefined,
		selectedPlayer: null,
		selectedStat: undefined,
		gameId: undefined,
		selectOptions: undefined,
	};
	const [data, setData] = useState(INITIAL_STATE);
	const handleChange = (playerId) => {
		for (let game of games) {
			game.homeId
		}
		setData({...data, selectedPlayer: playerId, gameId: })
	};
	useEffect(() => {
		async function getData(games) {
			const players = await OnlyLocksAPI.playerPickData(games);
			let selectOptions = [];
			players.forEach((p) => {
				selectOptions.push({ name: p.name, value: p.id });
			});
			setData({ players, selectOptions, selectedPlayer: undefined, selectedStat: undefined, gameId: undefined });
			console.log({ games });
		}
		getData(games);
	}, [games]);
	return (
		<Form>
			<Form.Text>Player Pick Form</Form.Text>
			{data.selectOptions ? (
				// <SearchableSelect
				// 	options={data.selectOptions}
				// 	search={true}
				// 	placeholder="Select a player"
				// 	autoComplete={true}
				// 	className={{ input: 'select-search-box' }}
				// />
				<SelectSearch
					options={data.selectOptions}
					value={data.selectedPlayer}
					name="players"
					placeholder="Select a player"
					search={true}
					onChange={handleChange}
				/>
			) : (
				<Spinner animation="border" variant="info" />
			)}
		</Form>
	);
}

export default PlayerPickForm;
