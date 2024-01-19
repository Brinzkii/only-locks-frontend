import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import PlayerStatsCard from '../player/PlayerStatsCard';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Loading from '../Loading';
import Button from 'react-bootstrap/Button';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import '../../styles/player/PlayerList.css';

function PlayerList({ data, setData }) {
	const conversions = {
		Points: 'points',
		'3 Pointers': 'tpm',
		Assists: 'assists',
		Rebounds: 'totalReb',
		Blocks: 'blocks',
		Steals: 'steals',
	};
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const navToPlayer = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	function handlePrevClick() {
		async function prevDayGames() {
			setLoading(true);
			setData({ ...data, players: undefined });
			console.debug('Players', data.players);
			const currDay = data.date;
			const prevDay = Moment(currDay).subtract(1, 'days').format('YYYYMMDD');
			console.log('Prev:', prevDay);
			let players = {};
			let points = await OnlyLocksAPI.sortPlayerStats({ time: prevDay, stat: 'points' });
			let tpm = await OnlyLocksAPI.sortPlayerStats({ time: prevDay, stat: 'tpm' });
			let assists = await OnlyLocksAPI.sortPlayerStats({ time: prevDay, stat: 'assists' });
			let rebounds = await OnlyLocksAPI.sortPlayerStats({ time: prevDay, stat: 'total_reb' });
			let blocks = await OnlyLocksAPI.sortPlayerStats({ time: prevDay, stat: 'blocks' });
			let steals = await OnlyLocksAPI.sortPlayerStats({ time: prevDay, stat: 'steals' });
			players.points = points;
			players.tpm = tpm;
			players.assists = assists;
			players.rebounds = rebounds;
			players.blocks = blocks;
			players.steals = steals;
			setData({ ...data, players, date: prevDay });
			setLoading(false);
		}
		prevDayGames();
	}
	function handleNextClick() {
		async function nextDayGames() {
			setLoading(true);
			setData({ ...data, players: undefined });
			console.debug('Players', data.players);
			const currDay = data.date;
			const nextDay = Moment(currDay).add(1, 'days').format('YYYYMMDD');
			console.log('Next:', nextDay);
			let players = {};
			let points = await OnlyLocksAPI.sortPlayerStats({ time: nextDay, stat: 'points' });
			let tpm = await OnlyLocksAPI.sortPlayerStats({ time: nextDay, stat: 'tpm' });
			let assists = await OnlyLocksAPI.sortPlayerStats({ time: nextDay, stat: 'assists' });
			let rebounds = await OnlyLocksAPI.sortPlayerStats({ time: nextDay, stat: 'total_reb' });
			let blocks = await OnlyLocksAPI.sortPlayerStats({ time: nextDay, stat: 'blocks' });
			let steals = await OnlyLocksAPI.sortPlayerStats({ time: nextDay, stat: 'steals' });
			players.points = points;
			players.tpm = tpm;
			players.assists = assists;
			players.rebounds = rebounds;
			players.blocks = blocks;
			players.steals = steals;
			setData({ ...data, players, date: nextDay });
			setLoading(false);
		}
		nextDayGames();
	}
	function handleDateSelection(evt) {
		console.log('DATE SELECTED');
		console.log(evt.target);
		async function getStats(date) {
			setLoading(true);
			setData({ ...data, date: Moment(date), players: undefined });
			let players = {};
			let points = await OnlyLocksAPI.sortPlayerStats({ time: date, stat: 'points' });
			let tpm = await OnlyLocksAPI.sortPlayerStats({ time: date, stat: 'tpm' });
			let assists = await OnlyLocksAPI.sortPlayerStats({ time: date, stat: 'assists' });
			let rebounds = await OnlyLocksAPI.sortPlayerStats({ time: date, stat: 'total_reb' });
			let blocks = await OnlyLocksAPI.sortPlayerStats({ time: date, stat: 'blocks' });
			let steals = await OnlyLocksAPI.sortPlayerStats({ time: date, stat: 'steals' });
			players.points = points;
			players.tpm = tpm;
			players.assists = assists;
			players.rebounds = rebounds;
			players.blocks = blocks;
			players.steals = steals;
			setData({ ...data, date: Moment(date), players });
			setLoading(false);
			console.log('DATA:', data);
		}
		getStats(Moment(evt.target.value).format('YYYYMMDD'));
	}
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);
	return (
		<div className="player-list text-center mt-4 mb-3">
			<h2>{Moment(data.date).format('LL')}</h2>
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
			{loading ? (
				<Loading size="100px" />
			) : (
				<Row className="player-list-cards-container mx-auto mt-2 mb-3">
					<Col>
						<div className="player-list-stat-table-container mt-3">
							<PlayerStatsCard
								title="Points"
								stats={data.players.points}
								conversions={conversions}
								navToPlayer={navToPlayer}
							/>
						</div>
						<div className="player-list-stat-table-container mt-3">
							<PlayerStatsCard
								title="3 Pointers"
								stats={data.players.tpm}
								conversions={conversions}
								navToPlayer={navToPlayer}
							/>
						</div>
						<div className="player-list-stat-table-container mt-3">
							<PlayerStatsCard
								title="Assists"
								stats={data.players.assists}
								conversions={conversions}
								navToPlayer={navToPlayer}
							/>
						</div>
					</Col>

					<Col>
						<div className="player-list-stat-table-container mt-3">
							<PlayerStatsCard
								title="Rebounds"
								stats={data.players.rebounds}
								conversions={conversions}
								navToPlayer={navToPlayer}
							/>
						</div>
						<div className="player-list-stat-table-container mt-3">
							<PlayerStatsCard
								title="Blocks"
								stats={data.players.blocks}
								conversions={conversions}
								navToPlayer={navToPlayer}
							/>
						</div>
						<div className="player-list-stat-table-container mt-3">
							<PlayerStatsCard
								title="Steals"
								stats={data.players.steals}
								conversions={conversions}
								navToPlayer={navToPlayer}
							/>
						</div>
					</Col>
				</Row>
			)}
		</div>
	);
}

export default PlayerList;
