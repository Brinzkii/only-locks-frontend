import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import PlayerSeasonStatsTable from './PlayerSeasonStatsTable';
import Loading from '../Loading';
import '../../styles/player/PlayerStats.css';

function PlayerStats({ categories }) {
	const [data, setData] = useState({ stats: undefined, activeSort: 'minutes' });
	const navigate = useNavigate();
	const navToPlayer = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	const handleCategoryClick = (stat) => {
		async function sortPlayers(stat) {
			setData({ activeSort: stat, stats: undefined });
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
			};
			const cleanStat = conversions[stat] || stat;
			const stats = await OnlyLocksAPI.sortPlayerStats({ stat: cleanStat });

			setData({ activeSort: stat, stats });
		}
		sortPlayers(stat);
	};
	useEffect(() => {
		async function getStats() {
			let stats = await OnlyLocksAPI.sortPlayerStats({ stat: 'minutes' });
			setData({ activeSort: 'minutes', stats });
		}
		getStats();
	}, []);
	return (
		<div className="player-stats text-center mx-auto mt-3">
			<h4>Player Season Stats</h4>
			{!data.stats ? (
				<Loading size="100px" />
			) : (
				<div className="player-stats-table-container">
					<PlayerSeasonStatsTable
						stats={data.stats}
						activeSort={data.activeSort}
						categories={categories}
						navToPlayer={navToPlayer}
						handleCategoryClick={handleCategoryClick}
					/>
				</div>
			)}
			{/*  */}
		</div>
	);
}

export default PlayerStats;
