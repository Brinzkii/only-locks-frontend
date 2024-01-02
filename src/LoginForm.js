import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlyLocksAPI from './OnlyLocksAPI';
import './Forms.css';

function LoginForm({ updateUser }) {
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
			const token = await OnlyLocksAPI.login(formData);
			updateUser({ username: formData.username, token });
			const user = await OnlyLocksAPI.getUser(localStorage.username);
			updateUser({
				picks: user.picks.playerPicks.concat(user.picks.teamPicks),
				following: user.followedTeams.concat(user.followedPlayers),
			});
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="LoginForm" onSubmit={handleSubmit}>
			<h1 className="LoginForm-title">Login</h1>
			<label htmlFor="username" className="LoginForm-label">
				Username:
			</label>
			<input name="username" onChange={handleChange} className="LoginForm-input" />

			<label htmlFor="password" className="LoginForm-label">
				Password:
			</label>
			<input name="password" type="password" onChange={handleChange} className="LoginForm-input" />

			<button className="LoginForm-button">Login</button>
		</form>
	);
}

export default LoginForm;
