import React from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from '../api/OnlyLocksAPI';
import PlayerStatsCard from './PlayerStatsCard';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
// import '../styles/PlayerList.css';

function PlayerList({ data, setData }) {
	// const [datePicker, setDatePicker] = useState(Moment(data.date).format('YYYY-MM-DD'));
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
		}
		prevDayGames();
	}
	function handleNextClick() {
		async function nextDayGames() {
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
		}
		nextDayGames();
	}
	function handleDateSelection(evt) {
		console.log('DATE SELECTED');
		console.log(evt.target);
		async function getStats(date) {
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
			console.log('DATA:', data);
		}
		getStats(Moment(evt.target.value).format('YYYYMMDD'));
	}
	return (
		<div className="PlayerList mt-4">
			<h2>{Moment(data.date).format('LL')}</h2>
			<Container>
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
			</Container>
			{!data.players ? (
				<Spinner animation="border" variant="info" />
			) : (
				<Container className="PlayerList-cards-container mt-4">
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
