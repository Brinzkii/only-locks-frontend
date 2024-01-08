import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import PlayerStatsCard from './PlayerStatsCard';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
// import './PlayerList.css';

function PlayerList({ data, setData }) {
	const conversions = {
		Points: 'points',
		'3 Pointers': 'tpm',
		Assists: 'assists',
		Rebounds: 'totalReb',
		Blocks: 'blocks',
		Steals: 'steals',
	};
	const navigate = useNavigate();
	const navToPlayer = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	function handlePrevClick() {
		async function prevDayGames() {
			setData({ ...data, players: undefined });
			console.debug('Players', data.players);
			const currDay = data.date;
			const prevDay = Moment(currDay).subtract(1, 'days').format('l').replaceAll('/', '-');
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
		}
		prevDayGames();
	}
	function handleNextClick() {
		async function nextDayGames() {
			setData({ ...data, players: undefined });
			console.debug('Players', data.players);
			const currDay = data.date;
			const nextDay = Moment(currDay).add(1, 'days').format('l').replaceAll('/', '-');
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
		}
		nextDayGames();
	}
	console.log('DATA:', data.players);
	return (
		<div className="PlayerList">
			<h2>{Moment(data.date).format('LL')}</h2>
			<Stack direction="horizontal">
				<Button onClick={handlePrevClick}>Prev</Button>
				<Button onClick={handleNextClick}>Next</Button>
			</Stack>
			{!data.players ? (
				<Spinner animation="border" variant="info" />
			) : (
				<Container>
					<Row>
						<Col>
							<div>
								<PlayerStatsCard
									title="Points"
									stats={data.players.points}
									conversions={conversions}
									navToPlayer={navToPlayer}
								/>
							</div>
						</Col>
						<Col>
							<div>
								<PlayerStatsCard
									title="3 Pointers"
									stats={data.players.tpm}
									conversions={conversions}
									navToPlayer={navToPlayer}
								/>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div>
								<PlayerStatsCard
									title="Assists"
									stats={data.players.assists}
									conversions={conversions}
									navToPlayer={navToPlayer}
								/>
							</div>
						</Col>
						<Col>
							<div>
								<PlayerStatsCard
									title="Rebounds"
									stats={data.players.rebounds}
									conversions={conversions}
									navToPlayer={navToPlayer}
								/>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div>
								<PlayerStatsCard
									title="Blocks"
									stats={data.players.blocks}
									conversions={conversions}
									navToPlayer={navToPlayer}
								/>
							</div>
						</Col>
						<Col>
							<div>
								<PlayerStatsCard
									title="Steals"
									stats={data.players.steals}
									conversions={conversions}
									navToPlayer={navToPlayer}
								/>
							</div>
						</Col>
					</Row>
				</Container>
			)}
		</div>
	);
}

export default PlayerList;
