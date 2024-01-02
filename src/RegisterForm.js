import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlyLocksAPI from './OnlyLocksAPI';
import './Forms.css';

function RegisterForm({ updateUser }) {
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
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="RegisterForm" onSubmit={handleSubmit}>
			<h1 className="RegisterForm-title">Sign Up</h1>
			<label htmlFor="username" className="RegisterForm-label">
				Username:
			</label>
			<input name="username" onChange={handleChange} className="RegisterForm-input" />

			<label htmlFor="password" className="RegisterForm-label">
				Password:
			</label>
			<input name="password" type="password" onChange={handleChange} className="RegisterForm-input" />

			<button className="RegisterForm-button">Register</button>
		</form>
	);
}

export default RegisterForm;
