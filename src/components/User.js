import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OnlyLocksAPI from '../api/OnlyLocksAPI';
import UserPlayerPicks from './UserPlayerPicks';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Moment from 'moment';
import uuid from 'react-uuid';

function User({ quarters }) {
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
					<div className="UserDetails-playerpicks-container mx-auto">
						<UserPlayerPicks
							picks={user.picks}
							quarters={quarters}
							navToPlayer={navToPlayer}
							navToGame={navToGame}
						/>
					</div>

					<div className="UserDetails-teampicks-container mx-auto">
						<h4 className="UserDetails-picks-header text-center">Team Picks</h4>
						<Accordion defaultActiveKey="0">
							{user.picks.teamPicks.map((p, idx) => (
								<Accordion.Item key={uuid()} eventKey={idx}>
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

				<Stack direction="horizontal" className="mt-5">
					<div className="UserDetails-followed-players-container mx-auto">
						<h4 className="UserDetails-picks-header text-center">Followed Players</h4>
						<Accordion defaultActiveKey="0">
							{user.followedPlayers.map((p, idx) => (
								<Accordion.Item key={uuid()} eventKey={idx}>
									<Accordion.Header>
										{p.name} ({p.teamCode})
									</Accordion.Header>
									<Accordion.Body>
										<h6 className="text-center">{p.teamName}</h6>
										<Stack direction="horizontal">
											<h6 className="ms-auto">#{p.number || 0}</h6>
											<div></div>
											<h6 className="mx-auto">{p.position}</h6>
										</Stack>
										<hr className="mt-0" />
										<Stack>
											<Row>
												<Col>
													<h6>{p.points} points</h6>
												</Col>
												<Col>
													<h6>{p.tpm} threes</h6>
												</Col>
											</Row>
											<Row>
												<Col>
													<h6>{p.assists} assists</h6>
												</Col>
												<Col>
													<h6>{p.rebounds} reb.</h6>
												</Col>
											</Row>
											<Row>
												<Col>
													<h6>{p.steals} steals</h6>
												</Col>
												<Col>
													<h6>{p.blocks} blocks</h6>
												</Col>
											</Row>
										</Stack>
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</div>

					<div className="UserDetails-followed-teams-container mx-auto">
						<h4 className="UserDetails-picks-header text-center">Followed Teams</h4>
						<Accordion defaultActiveKey="0">
							{user.followedTeams.map((t, idx) => (
								<Accordion.Item key={uuid()} eventKey={idx}>
									<Accordion.Header>{t.name}</Accordion.Header>
									<Accordion.Body className="text-center">
										<h6>
											{t.wins} - {t.losses}
										</h6>
										<h6>{t.conference}ern Conference</h6>
										<h6>{t.division} Division</h6>
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
