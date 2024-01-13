import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlyLocksAPI from '../api/OnlyLocksAPI';
import TeamStatsTable from './TeamStatsTable';
import Spinner from 'react-bootstrap/Spinner';

function TeamStats() {
	const [data, setData] = useState({ stats: undefined, activeSort: 'wins' });
	const categories = {
		gp: 'GP',
		wins: "W's",
		losses: "L's",
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
	const navigate = useNavigate();
	const navToTeam = (evt) => {
		navigate(`/teams/${evt.target.id}`);
	};
	const handleCategoryClick = (evt) => {
		async function sortTeams(stat) {
			setData({ stats: undefined, activeSort: stat });
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
				gp: 'games',
			};
			const cleanStat = conversions[stat] || stat;
			const stats = await OnlyLocksAPI.sortTeamStats({ cleanStat });

			setData({ activeSort: stat, stats });
		}
		sortTeams(evt.target.id);
	};
	useEffect(() => {
		async function getStats() {
			let stats = await OnlyLocksAPI.sortTeamStats({ stat: 'wins' });
			setData({ activeSort: 'wins', stats });
		}
		getStats();
	}, []);
	return (
		<div className="TeamStats">
			<h4>Team Season Stats</h4>
			{!data.stats ? (
				<Spinner animation="border" variant="info" />
			) : (
				<TeamStatsTable
					stats={data.stats}
					activeSort={data.activeSort}
					categories={categories}
					navToTeam={navToTeam}
					handleCategoryClick={handleCategoryClick}
				/>
			)}
		</div>
	);
}

export default TeamStats;
