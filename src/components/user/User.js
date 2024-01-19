import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import UserPlayerPicks from './UserPlayerPicks';
import UserTeamPicks from './UserTeamPicks';
import UserFollowedTeams from './UserFollowedTeams';
import UserFollowedPlayers from './UserFollowedPlayers';
import Loading from '../Loading';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/user/User.css';

function User({ quarters, standingsConversion }) {
	const ranks = {
		500: 'Rookie',
		1000: 'Novice',
		2500: 'Amateur',
		5000: 'Semi-Pro',
		10000: 'Pro',
		25000: 'Expert',
		50000: 'Master',
		100000: 'Champion',
		250000: 'Legend',
		500000: 'Hall of Famer',
	};
	const [user, setUser] = useState(undefined);
	let { username } = useParams();
	const navigate = useNavigate();
	const navToGame = (evt) => {
		navigate(`/games/${evt.target.id}`);
	};
	const navToPlayer = (evt) => {
		console.log(evt.target);
		navigate(`/players/${evt.target.id}`);
	};
	const navToTeam = (evt) => {
		navigate(`/teams/${evt.target.id}`);
	};
	useEffect(() => {
		async function getDetails(username) {
			let user = await OnlyLocksAPI.getUser(username);
			console.log(user);
			setUser(user);
		}
		getDetails(username);
	}, [username]);
	if (user === undefined) {
		return <Loading size="100px" />;
	} else {
		return (
			<div className="user mt-3 mb-3 mx-auto text-center">
				<h2 className="user-username">
					{user.username}{' '}
					<small className="user-record">
						({user.wins || 0} - {user.losses || 0})
					</small>
				</h2>
				<h6>Rank: {ranks[Object.keys(ranks).find((k, idx) => Number(k) > user.points)]}</h6>

				<Row className="user-stuff-container mt-4">
					<Col>
						<div className="user-playerpicks-container mx-auto">
							<UserPlayerPicks
								picks={user.picks}
								quarters={quarters}
								navToPlayer={navToPlayer}
								navToGame={navToGame}
							/>
						</div>
						<div className="user-teampicks-container mx-auto">
							<UserTeamPicks
								picks={user.picks}
								navToGame={navToGame}
								navToTeam={navToTeam}
								quarters={quarters}
							/>
						</div>
					</Col>
					<Col>
						<div className="user-followed-players-container mx-auto">
							<UserFollowedPlayers players={user.followedPlayers} navToPlayer={navToPlayer} />
						</div>

						<div className="user-followed-teams-container mx-auto">
							<UserFollowedTeams
								teams={user.followedTeams}
								navToTeam={navToTeam}
								standingsConversion={standingsConversion}
							/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default User;
