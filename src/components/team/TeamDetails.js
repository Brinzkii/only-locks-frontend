import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import PlayerStatsTable from '../player/PlayerSeasonStatsTable';
import TeamGames from '../team/TeamGames';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/team/TeamDetails.css';

function TeamDetails({ categories }) {
	const { teamId } = useParams();
	const INITIAL_STATE = {
		team: undefined,
		recentGames: undefined,
		nextGames: undefined,
		players: undefined,
		teamStats: undefined,
		playerStats: undefined,
	};
	const [data, setData] = useState(INITIAL_STATE);
	const navigate = useNavigate();
	const navToGame = (evt) => {
		navigate(`/games/${evt.target.id}`);
	};
	const navToTeam = (evt) => {
		navigate(`/teams/${evt.target.id}`);
	};
	const navToPlayer = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	const handleCategoryClick = (evt) => {
		async function sortPlayers(teamId, stat) {
			setData({ ...data, playerStats: undefined });
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
			};
			stat = conversions[stat] || stat;
			const playerStats = await OnlyLocksAPI.sortPlayerStats({ teamId, stat });

			setData({ ...data, playerStats });
		}
		sortPlayers(data.team.id, evt.target.id);
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
					<PlayerStatsTable
						stats={data.playerStats}
						categories={categories}
						navToPlayer={navToPlayer}
						handleCategoryClick={handleCategoryClick}
					/>
				</div>
				<Container fluid="lg">
					<Row>
						<Col>
							<div className="TeamDetails-recent-games">
								<h5>Last 5</h5>
								<TeamGames
									team={data.team}
									games={data.recentGames}
									navToGame={navToGame}
									navToTeam={navToTeam}
								/>
							</div>
						</Col>
						<Col>
							<div className="TeamDetails-next-games">
								<h5>Next 5</h5>
								<TeamGames
									team={data.team}
									games={data.nextGames}
									navToGame={navToGame}
									navToTeam={navToTeam}
								/>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default TeamDetails;
