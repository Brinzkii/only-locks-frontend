import React from 'react';
import StandingsTable from './team/StandingsTable';
// import './Home.css';

function Home({ standings }) {
	return (
		<div className="Home text-center">
			{localStorage.token ? (
				<div className="mt-4">
					<h1>Welcome back!</h1>
				</div>
			) : (
				<div className="mt-4">
					<h1>A whole world of NBA data is waiting for you, just have to login or register!</h1>
				</div>
			)}
		</div>
	);
}

export default Home;
