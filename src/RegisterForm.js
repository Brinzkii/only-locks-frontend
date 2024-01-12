import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlyLocksAPI from './OnlyLocksAPI';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Forms.css';

function RegisterForm({ updateUser, notifySuccess, notifyError }) {
	const INITIAL_DATA = {
		username: '',
		password: '',
	};
	const [formData, setFormData] = useState(INITIAL_DATA);
	const navigate = useNavigate();
	const handleChange = (evt) => {
		let { name, value } = evt.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const token = await OnlyLocksAPI.register(formData);
			updateUser({ username: formData.username, token });
			navigate('/');
			notifySuccess(`Thanks for signing up, ${formData.username}!`);
		} catch (err) {
			notifyError(err);
		}
	};

	return (
		<Form className="RegisterForm" onSubmit={handleSubmit}>
			<h1 className="RegisterForm-title">Sign Up</h1>
			<Form.Group>
				<Form.Label htmlFor="username" className="RegisterForm-label">
					Username:
				</Form.Label>
				<Form.Control
					type="text"
					name="username"
					onChange={handleChange}
					className="RegisterForm-input"
					autoComplete="new-username"
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label htmlFor="password" className="RegisterForm-label">
					Password:
				</Form.Label>
				<Form.Control
					name="password"
					type="password"
					onChange={handleChange}
					className="RegisterForm-input"
					autoComplete="new-password"
				/>
			</Form.Group>

			<Button className="RegisterForm-button" type="submit">
				Register
			</Button>
		</Form>
	);
}

export default RegisterForm;
