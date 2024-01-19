import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnlyLocksAPI from '../../api/OnlyLocksAPI';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../styles/user/Forms.css';

function LoginForm({ updateUser, notifySuccess, notifyError }) {
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
			notifySuccess(`Welcome back, ${user.username}!`);
		} catch (err) {
			notifyError(err);
		}
	};

	return (
		<Form className="login-form" onSubmit={handleSubmit}>
			<h1 className="login-form-title">Login</h1>
			<Form.Group>
				<Form.Label htmlFor="username" className="login-form-label">
					Username:
				</Form.Label>
				<Form.Control
					type="text"
					name="username"
					onChange={handleChange}
					className="login-form-input"
					autoComplete="username"
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label htmlFor="password" className="login-form-label">
					Password:
				</Form.Label>
				<Form.Control
					name="password"
					type="password"
					onChange={handleChange}
					className="login-form-input"
					autoComplete="current-password"
				/>
			</Form.Group>

			<Button className="login-form-button pb-2" type="submit">
				Login
			</Button>
		</Form>
	);
}

export default LoginForm;
