import React, { useState } from 'react';
import NewPickForm from './NewPickForm';
import NewPickButton from './NewPickButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function FormContainer() {
	const [data, setData] = useState({ show: false, form: <NewPickForm /> });
	const handlePickButton = () => (!data.show ? setData({ ...data, show: true }) : setData({ ...data, show: false }));
	return (
		<>
			<Modal show={data.show} onHide={handlePickButton}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Title>Ready to lock in your next pick?</Modal.Title>
				<Modal.Body>{data.form}</Modal.Body>
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

export default FormContainer;
