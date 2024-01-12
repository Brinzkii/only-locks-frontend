import React, { useState } from 'react';
import PlayerPickForm from './PlayerPickForm';
import TeamPickForm from './TeamPickForm';
import NewPickButton from './NewPickButton';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../styles/SelectSearch.css';

function PickFormContainer({ notifySuccess, notifyError }) {
	const [data, setData] = useState({
		show: false,
		playerPick: <PlayerPickForm notifyError={notifyError} notifySuccess={notifySuccess} />,
		teamPick: <TeamPickForm notifyError={notifyError} notifySuccess={notifySuccess} />,
	});
	const handlePickButton = () => (!data.show ? setData({ ...data, show: true }) : setData({ ...data, show: false }));
	return (
		<>
			<Modal show={data.show} onHide={handlePickButton}>
				<Modal.Header closeButton></Modal.Header>
				{/* <Modal.Title className="text-center">Ready to lock in your next pick?</Modal.Title> */}
				<Modal.Body>
					<Tabs defaultActiveKey="player" id="PickFormContainer-tabs" className="mb-3" justify>
						<Tab eventKey="player" title="Player">
							{data.playerPick}
						</Tab>
						<Tab eventKey="team" title="Team">
							{data.teamPick}
						</Tab>
					</Tabs>
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant="secondary" onClick={handlePickButton}>
						Having second thoughts...
					</Button>
					<Button variant="primary" onClick={handlePickButton}>
						Lock it in!
					</Button>
				</Modal.Footer> */}
			</Modal>
			<NewPickButton handleClick={handlePickButton} />
		</>
	);
}

export default PickFormContainer;
