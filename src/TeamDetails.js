import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OnlyLocksAPI from './OnlyLocksAPI';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import uuid from 'react-uuid';
import './TeamDetails.css';

function TeamDetails() {
	const categories = {
		gp: 'GP',
		minutes: 'MIN',
		points: 'PTS',
		fgm: 'FGM',
		fga: 'FGA',
		fgp: 'FG%',
		ftm: 'FTM',
		fta: 'FTA',
		ftp: 'FT%',
		tpm: 'TPM',
		tpa: 'TPA',
		tpp: 'TP%',
		totalReb: 'REB',
		offReb: 'ORB',
		defReb: 'DRB',
		assists: 'AST',
		fouls: 'PF',
		steals: 'STL',
		turnovers: 'TO',
		blocks: 'BLK',
		plusMinus: '+/-',
	};
	const { teamId } = useParams();
	const navigate = useNavigate();
	const INITIAL_STATE = { team: undefined, players: undefined, teamStats: undefined, playerStats: undefined };
	const [data, setData] = useState(INITIAL_STATE);
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
			console.log(playerStats);
			setData({ ...data, playerStats });
		}
		sortPlayers(data.team.id, evt.target.id);
	};
	const handlePlayerClick = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	useEffect(() => {
		async function getData(teamId) {
			const team = await OnlyLocksAPI.team(teamId);
			const teamStats = await OnlyLocksAPI.teamStats(teamId);
			const players = await OnlyLocksAPI.teamPlayers(teamId);

			let playerStats = [];
			for (let player of players) {
				const ps = await OnlyLocksAPI.playerSeasonStats(player.id);
				playerStats.push(ps);
			}

			setData({ team, teamStats, players, playerStats });
			console.log({ team, teamStats, players, playerStats });
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
					<Table className="TeamDetails-player-stats-table" size="sm">
						<thead>
							<tr key={uuid()}>
								<th>&emsp;</th>
								{Object.keys(categories).map((key) => {
									if (key !== 'id' || key !== 'name') {
										return (
											<th id={key} onClick={handleCategoryClick}>
												{categories[key]}
											</th>
										);
									}
								})}
							</tr>
						</thead>
						{!data.playerStats ? (
							<Spinner animation="border" variant="info" />
						) : (
							<tbody>
								{data.playerStats.map((p) => {
									return (
										<tr key={uuid()}>
											<td>{p.name}</td>
											<td>{p.gp}</td>
											<td>{p.minutes}</td>
											<td>{p.points}</td>
											<td>{p.fgm}</td>
											<td>{p.fga}</td>
											<td>{p.fgp.toFixed(1)}</td>
											<td>{p.ftm}</td>
											<td>{p.fta}</td>
											<td>{p.ftp.toFixed(1)}</td>
											<td>{p.tpm}</td>
											<td>{p.tpa}</td>
											<td>{p.tpp.toFixed(1)}</td>
											<td>{p.totalReb}</td>
											<td>{p.offReb}</td>
											<td>{p.defReb}</td>
											<td>{p.assists}</td>
											<td>{p.fouls}</td>
											<td>{p.steals}</td>
											<td>{p.turnovers}</td>
											<td>{p.blocks}</td>
											<td>{p.plusMinus}</td>
										</tr>
									);
								})}
							</tbody>
						)}
					</Table>
				</div>
			</div>
		);
	}
}

export default TeamDetails;
