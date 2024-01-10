import React from 'react';
import Button from 'react-bootstrap/Button';
import { HandIndex } from 'react-bootstrap-icons';
import './NewPickButton.css';

function NewPickButton() {
	return (
		// <Stack className="NewPickButton-stack" direction="horizontal">
		<Button className="NewPickButton ms-auto">
			<HandIndex className="NewPickButton-icon" />
		</Button>

		// </Stack>
	);
}

export default NewPickButton;
