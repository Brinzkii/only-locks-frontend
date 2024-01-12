import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlyLocksAPI from '../api/OnlyLocksAPI';
import PlayerSeasonStatsTable from './PlayerSeasonStatsTable';
import Spinner from 'react-bootstrap/Spinner';

function PlayerStats({ categories }) {
	const [stats, setStats] = useState(undefined);
	const navigate = useNavigate();
	const navToPlayer = (evt) => {
		navigate(`/players/${evt.target.id}`);
	};
	const handleCategoryClick = (evt) => {
		async function sortPlayers(stat) {
			setStats(undefined);
			const conversions = {
				totalReb: 'total_reb',
				offReb: 'off_reb',
				defReb: 'def_reb',
				plusMinus: 'plus_minus',
			};
			stat = conversions[stat] || stat;
			const stats = await OnlyLocksAPI.sortPlayerStats({ stat });

			setStats(stats);
		}
		sortPlayers(evt.target.id);
	};
	useEffect(() => {
		async function getStats() {
			let stats = await OnlyLocksAPI.sortPlayerStats({ stat: 'minutes' });
			console.log('STATS RES:', stats);
			setStats(stats);
		}
		getStats();
	}, []);
	return (
		<div className="PlayerStats mt-4">
			<h4>Player Season Stats</h4>
			{!stats ? (
				<Spinner animation="border" variant="info" />
			) : (
				<PlayerSeasonStatsTable
					stats={stats}
					categories={categories}
					navToPlayer={navToPlayer}
					handleCategoryClick={handleCategoryClick}
				/>
			)}
			{/*  */}
		</div>
	);
}

export default PlayerStats;
