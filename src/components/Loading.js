import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/Loading.css';

function Loading({ size }) {
	return (
		<Spinner
			id="loading-spinner"
			animation="border"
			variant="primary"
			size="xl"
			style={{ width: size, height: size }}
		/>
	);
}

export default Loading;
