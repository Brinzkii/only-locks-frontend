import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import PlayerSeasonStatsTable from '../player/PlayerSeasonStatsTable';
import TeamGames from '../team/TeamGames';
import GamesCalendar from '../game/GamesCalendar';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Utils from '../../utils/utils';
import '../../styles/team/TeamDetails.css';

function TeamDetails({ categories }) {
	const { teamId } = useParams();
	const INITIAL_STATE = {
		team: undefined,
		games: undefined,
		recentGames: undefined,
		nextGames: undefined,
		players: undefined,
		teamStats: undefined,
		playerStats: undefined,
	};
	const [key, setKey] = useState('roster');
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

	const eventPropGetter = (event, isSelected) => ({
		...(isSelected && {
			style: {
				backgroundColor: '#000',
			},
		}),
		...(event.resource.game.winner &&
			event.resource.game.winner === event.resource.team.id && {
				style: {
					backgroundColor: '#008000',
				},
			}),
		...(event.resource.game.winner &&
			event.resource.game.winner !== event.resource.team.id && {
				style: {
					backgroundColor: '#ff0000',
				},
			}),
		...(!event.resource.game.winner && {
			style: {
				backgroundColor: '#808080',
			},
		}),
	});

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

			const events = Utils.createEvents(games, team);

			setData({ team, teamStats, players, playerStats, games, recentGames, nextGames, events });
			console.log({ team, teamStats, players, playerStats, games, recentGames, nextGames, events });
		}
		getData(teamId);
	}, [teamId]);

	if (data.team === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="team-details mt-4 mb-3 mx-auto text-center">
				<div className="team-details-header">
					<Image className="team-details-logo" src={data.team.logo} />
					<h2 className="team-details-name">
						{data.team.name} ({data.teamStats.wins}-{data.teamStats.losses})
					</h2>
					<h5>
						{data.team.conference}ern Conference&emsp;|&emsp;{data.team.division} Division
					</h5>
				</div>

				<Tabs
					id="team-details-tabs"
					className="team-details-tabs mt-3"
					justify
					activeKey={key}
					onSelect={(k) => setKey(k)}
				>
					<Tab eventKey="roster" title="Roster">
						<div className="team-details-player-stats mt-4">
							<PlayerSeasonStatsTable
								stats={data.playerStats}
								categories={categories}
								navToPlayer={navToPlayer}
								handleCategoryClick={handleCategoryClick}
							/>
						</div>
					</Tab>
					<Tab eventKey="recentGames" title="Recent Games">
						<Stack direction="horizontal" className="mt-4">
							<div className="team-details-recent-games ms-auto">
								<h5>Last 5</h5>
								<TeamGames
									team={data.team}
									games={data.recentGames}
									navToGame={navToGame}
									navToTeam={navToTeam}
								/>
							</div>
							<div className="team-details-next-games mx-auto">
								<h5>Next 5</h5>
								<TeamGames
									team={data.team}
									games={data.nextGames}
									navToGame={navToGame}
									navToTeam={navToTeam}
								/>
							</div>
						</Stack>
					</Tab>
					<Tab eventKey="allGames" title="All Games">
						<div className="team-details-calendar-container mt-4">
							<GamesCalendar games={data.events} eventPropGetter={eventPropGetter} />
						</div>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default TeamDetails;
