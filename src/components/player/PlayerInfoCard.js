import React from 'react';
import Moment from 'moment';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import FollowButton from '../user/FollowButton';
import '../../styles/player/PlayerInfoCard.css';

function PlayerInfoCard({ player, team, navToTeam, user, notifySuccess, notifyError }) {
	const positions = {
		'F-G': 'Forward/Guard',
		'C-F': 'Center/Forward',
		SG: 'Shooting Guard',
		'G-F': 'Guard/Forward',
		C: 'Center',
		SF: 'Small Forward',
		G: 'Guard',
		F: 'Forward',
		'F-C': 'Forward/Center',
	};
	return (
		<Card className="player-info-card">
			<Card.Title className="player-info-card-name mt-2">
				<h4>{player.name}</h4>
			</Card.Title>
			<Card.Img
				id={team.id}
				onClick={navToTeam}
				className="player-info-card-image mx-auto mt-2"
				variant="top"
				src={team.logo}
			/>
			<Card.Title className="mt-3 mb-0 mx-auto">
				<Stack gap={3} direction="horizontal">
					<div>{`#${player.number || 0}`}</div>
					<div className="vr"></div>
					<div>{`${positions[player.position]}`}</div>
				</Stack>
				<div className="player-info-card-follow-button-container mt-3 mb-0">
					<FollowButton player={player} user={user} notifySuccess={notifySuccess} notifyError={notifyError} />
				</div>
			</Card.Title>
			<Card.Body className="mt-0 pt-0">
				<Stack className="" direction="vertical" gap={2}>
					{player.birthday ? (
						<>
							<hr />
							<div className="">
								Age:{' '}
								{Moment(Moment(player.birthday).format('YYYYMMDD'), 'YYYYMMDD').fromNow().slice(0, 2)}
							</div>
						</>
					) : (
						<></>
					)}
					{player.height !== 'Unknown' ? <div className="">Height: {player.height}</div> : <></>}
					{player.weight !== 'Unknown' ? <div className="">Weight: {player.weight}</div> : <></>}
					{player.college ? <div className="">College: {player.college}</div> : <></>}
				</Stack>
			</Card.Body>
		</Card>
	);
}

export default PlayerInfoCard;
