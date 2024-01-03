import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import Spinner from 'react-bootstrap/Spinner';
// import './GameDetails.css';

function GameDetails() {
	const [game, setGame] = useState(undefined);
	let { gameId } = useParams();
	useEffect(() => {
		async function getGame(gameId) {
			const game = await OnlyLocksAPI.game(gameId);
			setGame(game);
		}
		getGame(gameId);
	}, [gameId]);
	if (game === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="Game">
				<h2>
					{game.homeName} vs. {game.awayName}
				</h2>
				<h4>{game.location}</h4>
				<h4>{Moment(game.date).format('LL')}</h4>

				{!game.score ? <h4>{game.score}</h4> : <h4>{game.score}</h4>}
			</div>
		);
	}
}

export default GameDetails;
