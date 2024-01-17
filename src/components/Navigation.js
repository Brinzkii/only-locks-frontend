import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Logo from '../static/only-locks-logo.png';
import SelectSearch from 'react-select-search';
import uuid from 'react-uuid';
import '../styles/Navigation.css';
import '../styles/SelectSearch.css';

function Navigation({ logoutUser, teams, players }) {
	const navigate = useNavigate();
	const [data, setData] = useState({ teams: teams, options: [] });
	const handleSearchSelect = (url) => {
		navigate(url);
	};
	useEffect(() => {
		let selectOptions = [];
		if (teams.length && players.length) {
			for (let p of players) {
				selectOptions.push({ name: p.name, value: `/players/${p.id}` });
			}
			for (let t of teams) {
				selectOptions.push({ name: t.name, value: `/teams/${t.id}` });
			}
			setData({ teams: teams, options: selectOptions });
		}
	}, [players, teams]);
	return (
		<div className="navigation d-lg-flex align-items-center">
			<Navbar className="bg-body-tertiary" sticky="top" expand="lg">
				<Navbar.Brand className="navigation-brand" href="/">
					<img className="navigation-logo" src={Logo} alt="OnlyLocks" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="onlylocks-navbar-nav" />
				<Navbar.Collapse className="align-items-center" id="onlylocks-navbar-nav">
					{!localStorage.token ? (
						<Nav>
							<Button href="/login" variant="success" key={uuid()}>
								Login
							</Button>
							<Button href="/register" className="p-2 ms-auto" variant="info" key={uuid()}>
								Register
							</Button>
						</Nav>
					) : (
						<Nav>
							<Nav.Link className="h-100" href="/games">
								Games
							</Nav.Link>

							<Nav.Link className="h-100" href="/players">
								Players
							</Nav.Link>

							<NavDropdown className="h-100" title="Stats" id="stats-dropdown">
								<NavDropdown.Item href={`/players/stats`}>Players</NavDropdown.Item>

								<NavDropdown.Item href={`/teams/stats`}>Teams</NavDropdown.Item>
							</NavDropdown>

							<NavDropdown className="h-100" title="Teams" id="teams-dropdown">
								{data.teams.map((t) => (
									<NavDropdown.Item href={`/teams/${t.id}`} key={uuid()}>
										{t.name}
									</NavDropdown.Item>
								))}
							</NavDropdown>

							<SelectSearch
								options={data.options}
								onChange={handleSearchSelect}
								search={true}
								autoComplete="on"
								placeholder="Search"
							/>
							<Button href={`/users/${localStorage.username}`} variant="info" key={uuid()}>
								{localStorage.username}
							</Button>
							<Button onClick={logoutUser} className="p-2 ms-auto" variant="warning" key={uuid()}>
								Logout
							</Button>
						</Nav>
					)}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default Navigation;
