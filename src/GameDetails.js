import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import OnlyLocksAPI from './OnlyLocksAPI';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
// import './GameDetails.css';

function GameDetails() {
	const [data, setData] = useState({
		game: undefined,
		gameStats: { home: undefined },
		teamStats: { home: undefined, away: undefined },
	});
	let { gameId } = useParams();
	useEffect(() => {
		async function getData(gameId) {
			const game = await OnlyLocksAPI.game(gameId);
			const gameStats = await OnlyLocksAPI.teamGameStats(gameId);
			const homeTeamStats = await OnlyLocksAPI.teamStats(game.homeId);
			const awayTeamStats = await OnlyLocksAPI.teamStats(game.awayId);
			setData({
				game,
				gameStats: {
					home: gameStats.home,
					away: gameStats.away,
				},
				teamStats: {
					home: homeTeamStats,
					away: awayTeamStats,
				},
			});
		}
		getData(gameId);
	}, [gameId]);
	if (data.game === undefined) {
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="GameDetails">
				<h2 className="GameDetails-header">
					{data.game.homeName} vs. {data.game.awayName}
				</h2>
				<h4 className="GameDetails-location">{data.game.location}</h4>
				<h5 className="GameDetails-date">{Moment(data.game.date).format('LL')}</h5>

				{!data.game.clock ? <></> : <h4 className="GameDetails-clock">{data.game.clock}</h4>}

				{!data.game.score ? (
					<h4>TBD</h4>
				) : (
					<h4 className="GameDetails-score">
						<small>{data.game.homeCode}</small> {data.game.score} <small>{data.game.awayCode}</small>
					</h4>
				)}
			</div>
		);
	}
}

export default GameDetails;
