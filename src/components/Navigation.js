import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
		<Navbar expand="lg" bg="secondary" data-bs-theme="dark" className="navigation">
			<Container className="navigation-container">
				<Navbar.Brand className="navigation-brand ma-auto" href="/">
					<img className="navigation-logo" src={Logo} alt="OnlyLocks" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="onlylocks-navbar-nav" />
				<Navbar.Collapse id="onlylocks-navbar-nav">
					{!localStorage.token ? (
						<Nav className="ms-auto align-items-center">
							<Button href="/login" variant="primary" className="m-2" key={uuid()}>
								Login
							</Button>
							<Button href="/register" className="m-2" variant="warning" key={uuid()}>
								Register
							</Button>
						</Nav>
					) : (
						<Nav className="ms-auto align-items-center">
							<Nav.Link href="/games">Games</Nav.Link>

							<Nav.Link href="/players">Top Players</Nav.Link>

							<NavDropdown title="Season Stats" id="stats-dropdown">
								<NavDropdown.Item className="text-center" href={`/players/stats`}>
									Players
								</NavDropdown.Item>

								<NavDropdown.Item className="text-center" href={`/teams/stats`}>
									Teams
								</NavDropdown.Item>
							</NavDropdown>

							<NavDropdown title="Teams" id="teams-dropdown">
								{data.teams.map((t) => (
									<NavDropdown.Item className="text-center" href={`/teams/${t.id}`} key={uuid()}>
										{t.name}
									</NavDropdown.Item>
								))}
							</NavDropdown>

							<Form inline>
								<Row className="align-items-center">
									<Col md="auto" className="p-0 m-0 mx-auto">
										<SelectSearch
											options={data.options}
											onChange={handleSearchSelect}
											search={true}
											autoComplete="on"
											placeholder="Search"
										/>
									</Col>
									<Col xs="auto" className="p-0 mx-auto">
										<Button
											className="nav-profile-button"
											href={`/users/${localStorage.username}`}
											variant="primary"
											key={uuid()}
										>
											{localStorage.username}
										</Button>
									</Col>
									<Col xs="auto" className="p-0 mx-auto">
										<Button
											className="nav-logout-button"
											onClick={logoutUser}
											variant="warning"
											key={uuid()}
										>
											Logout
										</Button>
									</Col>
								</Row>
							</Form>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
