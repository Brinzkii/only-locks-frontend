import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Logo from './static/only-locks-logo.png';
import uuid from 'react-uuid';
import './Navigation.css';
// import 'bootstrap/js/src/collapse.js';

function Navigation({ logoutUser }) {
	const teams = [
		{ name: 'Atlanta Hawks', id: 1 },
		{ name: 'Boston Celtics', id: 2 },
		{ name: 'Brooklyn Nets', id: 4 },
		{ name: 'Charlotte Hornets', id: 5 },
		{ name: 'Chicago Bulls', id: 6 },
		{ name: 'Cleveland Cavaliers', id: 7 },
		{ name: 'Dallas Mavericks', id: 8 },
		{ name: 'Denver Nuggets', id: 9 },
		{ name: 'Detroit Pistons', id: 10 },
		{ name: 'Golden State Warriors', id: 11 },
		{ name: 'Houston Rockets', id: 14 },
		{ name: 'Indiana Pacers', id: 15 },
		{ name: 'Los Angeles Clippers', id: 16 },
		{ name: 'Los Angeles Lakers', id: 17 },
		{ name: 'Memphis Grizzlies', id: 19 },
		{ name: 'Miami Heat', id: 20 },
		{ name: 'Milwaukee Bucks', id: 21 },
		{ name: 'Minnesota Timberwolves', id: 22 },
		{ name: 'New Orleans Pelicans', id: 23 },
		{ name: 'New York Knicks', id: 24 },
		{ name: 'Oklahoma City Thunder', id: 25 },
		{ name: 'Orlando Magic', id: 26 },
		{ name: 'Philadelphia 76ers', id: 27 },
		{ name: 'Phoenix Suns', id: 28 },
		{ name: 'Portland Trail Blazers', id: 29 },
		{ name: 'Sacramento Kings', id: 30 },
		{ name: 'San Antonio Spurs', id: 31 },
		{ name: 'Toronto Raptors', id: 38 },
		{ name: 'Utah Jazz', id: 40 },
		{ name: 'Washington Wizards', id: 41 },
	];
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
							<Nav.Link href="/games">Games</Nav.Link>

							<Nav.Link href="/players">Players</Nav.Link>

							<NavDropdown title="Stats" id="stats-dropdown">
								<NavDropdown.Item href={`/players/stats`}>Players</NavDropdown.Item>

								<NavDropdown.Item href={`/teams/stats`}>Teams</NavDropdown.Item>
							</NavDropdown>

							<NavDropdown title="Teams" id="teams-dropdown">
								{teams.map((t) => (
									<NavDropdown.Item href={`/teams/${t.id}`} key={uuid()}>
										{t.name}
									</NavDropdown.Item>
								))}
							</NavDropdown>
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
								<Stack
									className="Navigation-container-right ps-4"
									direction="horizontal"
									gap={2}
									key={uuid()}
								>
									<Button href={`/users/${localStorage.username}`} variant="info" key={uuid()}>
										{localStorage.username}
									</Button>
									<Button onClick={logoutUser} className="p-2 ms-auto" variant="warning" key={uuid()}>
										Logout
									</Button>
								</Stack>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default Navigation;
