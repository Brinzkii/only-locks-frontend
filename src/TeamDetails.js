import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import PlayerStatsTable from './PlayerStatsTable';
import TeamGames from './TeamGames';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import uuid from 'react-uuid';
import './TeamDetails.css';

function TeamDetails({ categories }) {
	const { teamId } = useParams();
	const navigate = useNavigate();
	const INITIAL_STATE = {
		team: undefined,
		recentGames: undefined,
		nextGames: undefined,
		players: undefined,
		teamStats: undefined,
		playerStats: undefined,
	};
	const [data, setData] = useState(INITIAL_STATE);

	const handlePlayerClick = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	useEffect(() => {
		async function getData(teamId) {
			const team = await OnlyLocksAPI.team(teamId);
			const teamStats = await OnlyLocksAPI.teamStats(teamId);
			const players = await OnlyLocksAPI.teamPlayers(teamId);
			const playerStats = await OnlyLocksAPI.sortPlayerStats({ teamId });
			const games = await OnlyLocksAPI.teamGames(teamId);

			function findCloseGames(date = Moment()) {
				let foundNext = false;
				let idx = 0;
				while (!foundNext) {
					if (Moment(games[idx].date) >= date) {
						foundNext = true;
					} else {
						idx++;
					}
				}

				let recentGames = [games[idx - 1], games[idx - 2], games[idx - 3], games[idx - 4], games[idx - 5]];

				let nextGames = [games[idx], games[idx + 1], games[idx + 2], games[idx + 3], games[idx + 4]];

				return { recentGames, nextGames };
			}

			const { recentGames, nextGames } = findCloseGames();

			// function findCloseGames(games, date=Moment().format('l')) {

			// }
			console.log({ team, teamStats, players, playerStats, recentGames, nextGames });
			console.log({ team, teamStats, players, playerStats, recentGames, nextGames });

			setData({ team, teamStats, players, playerStats, recentGames, nextGames });
			console.log({ team, teamStats, players, playerStats, recentGames, nextGames });
		}
		getData(teamId);
	}, [teamId]);

	if (data.team === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="TeamDetails mt-4">
				<div className="TeamDetails-header">
					<Image className="TeamDetails-logo" src={data.team.logo} />
					<h2 className="TeamDetails-name">
						{data.team.name} ({data.teamStats.wins}-{data.teamStats.losses})
					</h2>
					<h5>
						{data.team.conference}ern Conference&emsp;|&emsp;{data.team.division} Division
					</h5>
				</div>

				<div className="TeamDetails-player-stats mt-4">
					<h5>Roster</h5>
					<PlayerStatsTable data={data} setData={setData} categories={categories} />
				</div>
				<Container fluid="lg">
					<Row>
						<Col>
							<div className="TeamDetails-recent-games">
								<h5>Last 5</h5>
								<TeamGames team={data.team} games={data.recentGames} />
							</div>
						</Col>
						<Col>
							<div className="TeamDetails-next-games">
								<h5>Next 5</h5>
								<TeamGames team={data.team} games={data.nextGames} />
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default TeamDetails;
