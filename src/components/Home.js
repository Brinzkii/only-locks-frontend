import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from './game/GameCard';
import Loading from './Loading';
import uuid from 'react-uuid';

function Home({ data, quarters }) {
	const navigate = useNavigate();
	const navToGame = (evt) => {
		navigate(`/games/${evt.target.id}`);
	};

	return (
		<div className="Home text-center">
			{localStorage.token ? (
				data.isLoading ? (
					<>
						<h1 className="mt-4">Today's Slate</h1>
						<Loading size="100px" />
					</>
				) : (
					<div className="mt-4">
						<div className="home-games-container mb-3">
							{data.games.length === 0 ? (
								<>
									<h1>Today's Slate</h1>
									<h3 className="mt-3">There are no games today :(</h3>
								</>
							) : (
								<>
									<h1>Today's Slate</h1>
									{data.games.map((g) => {
										return (
											<GameCard game={g} navToGame={navToGame} quarters={quarters} key={uuid()} />
										);
									})}
								</>
							)}
						</div>
					</div>
				)
			) : (
				<div className="mt-4">
					<h1>Login or register above to gain access to NBA data, picks, and community features!</h1>
				</div>
			)}
		</div>
	);
}

export default Home;
