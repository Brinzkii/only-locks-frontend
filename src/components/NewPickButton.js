import React from 'react';
import Button from 'react-bootstrap/Button';
import { HandIndex } from 'react-bootstrap-icons';
import '../styles/NewPickButton.css';

function NewPickButton({ handleClick }) {
	return (
		<Button className="NewPickButton ms-auto" onClick={handleClick}>
			<HandIndex className="NewPickButton-icon" />
		</Button>
	);
}

export default NewPickButton;
