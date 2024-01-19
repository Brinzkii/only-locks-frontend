import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../styles/user/Forms.css';

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
		<Form className="register-form" onSubmit={handleSubmit}>
			<h1 className="register-form-title">Sign Up</h1>
			<Form.Group>
				<Form.Label htmlFor="username" className="register-form-label">
					Username:
				</Form.Label>
				<Form.Control
					type="text"
					name="username"
					onChange={handleChange}
					className="register-form-input"
					autoComplete="new-username"
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label htmlFor="password" className="register-form-label">
					Password:
				</Form.Label>
				<Form.Control
					name="password"
					type="password"
					onChange={handleChange}
					className="register-form-input"
					autoComplete="new-password"
				/>
			</Form.Group>

			<Button className="register-form-button" type="submit">
				Register
			</Button>
		</Form>
	);
}

export default RegisterForm;
