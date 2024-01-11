import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import PlayerPickForm from './PlayerPickForm';
import TeamPickForm from './TeamPickForm';
import NewPickButton from './NewPickButton';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import OnlyLocksAPI from './OnlyLocksAPI';

function PickFormContainer() {
	const [data, setData] = useState({
		show: false,
		games: undefined,
		playerPick: <PlayerPickForm games={undefined} />,
		teamPick: <TeamPickForm games={undefined} />,
	});
	const handlePickButton = () => (!data.show ? setData({ ...data, show: true }) : setData({ ...data, show: false }));
	useEffect(() => {
		async function getGames() {
			const games = await OnlyLocksAPI.gamesByDate(Moment().format('YYYYMMDD'));
			setData({
				show: data.show,
				games,
				playerPick: <PlayerPickForm games={games} />,
				teamPick: <TeamPickForm games={games} />,
			});
		}
		getGames();
	}, [data.show]);
	return (
		<>
			<Modal show={data.show} onHide={handlePickButton}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Title className="text-center">Ready to lock in your next pick?</Modal.Title>
				<Modal.Body>
					{data.games ? (
						<Tabs defaultActiveKey="player" id="PickFormContainer-tabs" className="mb-3" justify>
							<Tab eventKey="player" title="Player">
								{data.playerPick}
							</Tab>
							<Tab eventKey="team" title="Team">
								{data.teamPick}
							</Tab>
						</Tabs>
					) : (
						<Spinner animation="border" variant="info" />
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handlePickButton}>
						Having second thoughts...
					</Button>
					<Button variant="primary" onClick={handlePickButton}>
						Lock it in!
					</Button>
				</Modal.Footer>
			</Modal>
			<NewPickButton handleClick={handlePickButton} />
		</>
	);
}

export default PickFormContainer;
