import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Logo from './static/only-locks-logo.png';
import SelectSearch from 'react-select-search';
import uuid from 'react-uuid';
import './Navigation.css';
import './SelectSearch.css';

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
	console.log('TEAMS IN NAV:', data.teams);
	return (
		<div className="Navigation">
			<Navbar className="bg-body-tertiary" sticky="top" expand="lg">
				<Container>
					<Navbar.Brand className="Navigation-brand" href="/">
						<img className="Navigation-logo" src={Logo} alt="OnlyLocks" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="onlylocks-navbar-nav" />
					<Navbar.Collapse className="flex-column align-items-end" id="onlylocks-navbar-nav">
						<Nav>
							{!localStorage.token ? (
								<Stack
									className="Navigation-container-right ms-4"
									direction="horizontal"
									gap={2}
									key={uuid()}
								>
									<Button href="/login" variant="success" key={uuid()}>
										Login
									</Button>
									<Button href="/register" className="p-2 ms-auto" variant="info" key={uuid()}>
										Register
									</Button>
								</Stack>
							) : (
								<>
									<Nav.Link href="/games">Games</Nav.Link>

									<Nav.Link href="/players">Players</Nav.Link>

									<NavDropdown title="Stats" id="stats-dropdown">
										<NavDropdown.Item href={`/players/stats`}>Players</NavDropdown.Item>

										<NavDropdown.Item href={`/teams/stats`}>Teams</NavDropdown.Item>
									</NavDropdown>

									<NavDropdown title="Teams" id="teams-dropdown">
										{data.teams.map((t) => (
											<NavDropdown.Item href={`/teams/${t.id}`} key={uuid()}>
												{t.name}
											</NavDropdown.Item>
										))}
									</NavDropdown>

									<Stack
										className="Navigation-container-right ps-4"
										direction="horizontal"
										gap={2}
										key={uuid()}
									>
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
										<Button
											onClick={logoutUser}
											className="p-2 ms-auto"
											variant="warning"
											key={uuid()}
										>
											Logout
										</Button>
									</Stack>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default Navigation;
