import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import UserPlayerPicks from './UserPlayerPicks';
import UserTeamPicks from './UserTeamPicks';
import UserFollowedTeams from './UserFollowedTeams';
import UserFollowedPlayers from './UserFollowedPlayers';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';

function User({ quarters }) {
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
		return <Spinner animation="border" variant="info" />;
	} else {
		return (
			<div className="UserDetails mt-4 text-center">
				<h2 className="UserDetails-username">
					{user.username}{' '}
					<small className="UserDetails-record">
						({user.wins || 0} - {user.losses || 0})
					</small>
				</h2>
				<h6>Rank: {ranks[Object.keys(ranks).find((k, idx) => Number(k) > user.points)]}</h6>

				<Stack direction="horizontal" className="mt-4">
					<div className="UserDetails-playerpicks-container mx-auto">
						<UserPlayerPicks
							picks={user.picks}
							quarters={quarters}
							navToPlayer={navToPlayer}
							navToGame={navToGame}
						/>
					</div>

					<div className="UserDetails-teampicks-container mx-auto">
						<UserTeamPicks
							picks={user.picks}
							navToGame={navToGame}
							navToTeam={navToTeam}
							quarters={quarters}
						/>
					</div>
				</Stack>

				<Stack direction="horizontal" className="mt-5">
					<div className="UserDetails-followed-players-container mx-auto">
						<UserFollowedPlayers players={user.followedPlayers} navToPlayer={navToPlayer} />
					</div>

					<div className="UserDetails-followed-teams-container mx-auto">
						<UserFollowedTeams teams={user.followedTeams} navToTeam={navToTeam} />
					</div>
				</Stack>
			</div>
		);
	}
}

export default User;
