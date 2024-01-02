import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OnlyLocksAPI from './OnlyLocksAPI';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import Accordion from 'react-bootstrap/Accordion';
import Moment from 'moment';

function User() {
	const [user, setUser] = useState(undefined);
	let { username } = useParams();

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
			<div className="UserDetails mt-4">
				<h2 className="UserDetails-username">{user.username}</h2>
				<small className="UserDetails-record">
					{user.wins || 0} - {user.losses || 0}
				</small>
				<Stack direction="horizontal" className="mt-4">
					<div className="p-5 UserDetails-playerpicks-container">
						<h4 className="UserDetails-picks-header">Player Picks</h4>
						<Accordion defaultActiveKey="0">
							{user.picks.playerPicks.map((p, idx) => (
								<Accordion.Item eventKey={idx}>
									<Accordion.Header>
										{p.player} {p.over_under} {p.value} {p.stat}
									</Accordion.Header>
									<Accordion.Body>
										<h6>{Moment(p.date).format('LL')}</h6>
										<h6>{p.game}</h6>
										<h6>Result: {p.result || 'TBD'}</h6>
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</div>

					<div className="p-5 ms-auto UserDetails-teampicks-container">
						<h4 className="UserDetails-picks-header">Team Picks</h4>
						<Accordion defaultActiveKey="0">
							{user.picks.teamPicks.map((p, idx) => (
								<Accordion.Item eventKey={idx}>
									<Accordion.Header>
										{p.win_spread === 'WIN' ? `Winner: ${p.name}` : `${p.name} ${p.value}`}
										{p.team} {p.win} {p.value} {p.stat}
									</Accordion.Header>
									<Accordion.Body>
										<h6>{Moment(p.date).format('LL')}</h6>
										<h6>{p.game}</h6>
										<h6>Result: {p.result || 'TBD'}</h6>
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</div>
				</Stack>

				<Stack direction="horizontal" className="mt-4">
					<div className="p-5 UserDetails-followed-players-container">
						<h4 className="UserDetails-picks-header">Followed Players</h4>
						<Accordion defaultActiveKey="0">
							{user.followedPlayers.map((p, idx) => (
								<Accordion.Item eventKey={idx}>
									<Accordion.Header>
										{p.player} {p.over_under} {p.value} {p.stat}
									</Accordion.Header>
									<Accordion.Body>
										<h6>{Moment(p.date).format('LL')}</h6>
										<h6>{p.game}</h6>
										<h6>Result: {p.result || 'TBD'}</h6>
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</div>

					<div className="p-5 ms-auto UserDetails-followed-teams-container">
						<h4 className="UserDetails-picks-header">Followed Teams</h4>
						<Accordion defaultActiveKey="0">
							{user.picks.teamPicks.map((p, idx) => (
								<Accordion.Item eventKey={idx}>
									<Accordion.Header>
										{p.win_spread === 'WIN' ? `Winner: ${p.name}` : `${p.name} ${p.value}`}
										{p.team} {p.win} {p.value} {p.stat}
									</Accordion.Header>
									<Accordion.Body>
										<h6>{Moment(p.date).format('LL')}</h6>
										<h6>{p.game}</h6>
										<h6>Result: {p.result || 'TBD'}</h6>
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</div>
				</Stack>
			</div>
		);
	}
}

export default User;
