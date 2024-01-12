import React from 'react';
// import './Home.css';

function Home({ user }) {
	return (
		<div className="Home">
			{localStorage.token ? (
				<div className="mt-4">
					<h1>Welcome back to OnlyLocks!</h1>
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
