import axios from 'axios';

const BASE_API_URL = 'https://only-locks-api.onrender.com';

class OnlyLocksAPI {
	// the token for interacting with API will be stored here/
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${BASE_API_URL}/${endpoint}`;
		const headers = { authorization: localStorage.token };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Register user */

	static async register({ username, password }) {
		let res = await this.request(`auth/register`, { username, password }, 'post');
		return res.token;
	}

	/** Login user */

	static async login({ username, password }) {
		let res = await this.request(`auth/token`, { username, password }, 'post');
		return res.token;
	}

	/** Get user details */

	static async getUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Follow player */

	static async followPlayer({ username, playerId }) {
		let res = await this.request(`users/${username}/players/${playerId}`, {}, 'post');
		return res.user;
	}

	/** Follow team */

	static async followTeam({ username, teamId }) {
		let res = await this.request(`users/${username}/teams/${teamId}`, {}, 'post');
		return res.user;
	}

	/** Unfollow player */

	static async unfollowPlayer({ username, playerId }) {
		let res = await this.request(`users/${username}/players/${playerId}`, {}, 'delete');
		return res.user;
	}

	/** Unfollow team */

	static async unfollowTeam({ username, teamId }) {
		let res = await this.request(`users/${username}/teams/${teamId}`, {}, 'delete');
		return res.user;
	}

	/** Get user picks */

	static async userPicks(username) {
		let res = await this.request(`users/${username}/picks`);
		return res.picks;
	}

	/** New player pick */

	static async playerPick({ username, playerId, gameId, stat, over_under, value, point_value }) {
		let res = await this.request(
			`users/${username}/picks/players`,
			{ username, playerId, gameId, stat, over_under, value, point_value },
			'post'
		);
		return res.pick;
	}

	/** Remove player pick */

	static async deletePlayerPick(username, pickId) {
		let res = await this.request(`users/${username}/picks/players/${pickId}`, 'delete');
		return res.removed;
	}

	/** New team pick */

	static async teamPick({ username, teamId, gameId }) {
		let res = await this.request(`users/${username}/picks/teams`, { teamId, gameId }, 'post');
		return res.pick;
	}

	/** Remove team pick */

	static async deleteTeamPick({ username, pickId }) {
		let res = await this.request(`users/picks/teams/${pickId}`, 'delete');
		return res.removed;
	}

	/** Get all teams */

	static async allTeams() {
		let res = await this.request(`teams`);
		return res.teams;
	}

	/** Get team by ID */

	static async team(teamId) {
		let res = await this.request(`teams/${teamId}`);
		return res.team;
	}

	/** Get conference standings */

	static async conferenceStandings() {
		let res = await this.request(`teams/standings`);
		return res.standings;
	}

	/** Get all team season stats */

	static async allTeamStats() {
		let res = await this.request(`teams/stats`);
		return res.teamStats;
	}

	/** Get team season stats */

	static async teamStats(teamId) {
		let res = await this.request(`teams/${teamId}/stats`);
		return res.teamStats;
	}

	/** Sort all teams by season stats */

	static async sortTeamStats({ stat, order }) {
		let res = await this.request(`teams/stats/sort`, { stat, order }, 'post');
		return res.teamStats;
	}

	/** List of teams games */

	static async teamGames(teamId) {
		let res = await this.request(`teams/${teamId}/games`);
		return res.teamGames;
	}

	/** Get team pick data
	 *
	 * 	Requires an array of games
	 */

	static async teamPickData(games) {
		let res = await this.request(`teams/stats/picks`, { games }, 'post');
		return res.teamPickData;
	}

	/** List of players on team */

	static async teamPlayers(teamId) {
		let res = await this.request(`teams/${teamId}/players`);
		return res.teamPlayers;
	}

	/** List all players in NBA */

	static async allPlayers() {
		let res = await this.request(`players`);
		return res.players;
	}

	/** Get player by ID */

	static async player(playerId) {
		let res = await this.request(`players/${playerId}`);
		return res.player;
	}

	/** Get player season stats by ID */

	static async playerSeasonStats(playerId) {
		let res = await this.request(`players/${playerId}/stats/season`);
		return res.seasonStats;
	}

	/** Get a players stats for a specific game */

	static async playerGameStats(playerId, gameId) {
		let res = await this.request(`players/${playerId}/stats/game`, { gameId }, 'post');
		return res.gameStats;
	}

	/** Get all of a players game stats for the season */

	static async allPlayerGameStats(playerId) {
		let res = await this.request(`players/${playerId}/stats/game`, {}, 'post');
		return res.gameStats;
	}

	/** Sort all players by stats
	 *
	 * Time can be a date string, 'yesterday', 'today', 'season', or 'allGames'
	 *
	 * Other parameters are optional
	 *
	 * 	Optionally can pass in teamId, time and order
	 **/

	static async sortPlayerStats({ playerId, teamId, gameId, time, stat, order }) {
		let res = await this.request(`players/stats/sort`, { playerId, teamId, gameId, time, stat, order }, 'post');
		return res.sortedStats;
	}

	/** Get player pick data
	 *
	 * 	Requires an array of games
	 */

	static async playerPickData(games) {
		let res = await this.request(`players/stats/picks`, { games }, 'post');
		return res.playerPickData;
	}

	/** Get all NBA games */

	static async allGames() {
		let res = await this.request(`games`);
		return res.games;
	}

	/** Get game by ID */

	static async game(gameId) {
		let res = await this.request(`games/${gameId}`);
		return res.game;
	}

	/** Get team stats for a game by ID */

	static async teamGameStats(gameId) {
		let res = await this.request(`games/${gameId}/stats`);
		return res.gameStats;
	}

	/** Get head to head stats for two teams by IDs */

	static async h2h(team1, team2) {
		let res = await this.request(`games/h2h/${team1}/${team2}`);
		return res.h2h;
	}

	/** Get top game performers for both teams by game ID */

	static async gameTopPerformers(gameId) {
		let res = await this.request(`games/${gameId}/top`);
		return res.topPerformers;
	}

	/** Get season top performers by team ID*/

	static async seasonTopPerformers(teamId) {
		let res = await this.request(`teams/${teamId}/stats/top`);
		return res.topPerformers;
	}

	/** Filter games by date */

	static async gamesByDate(date) {
		let res = await this.request(`games/filter/date/${date}`);
		return res.games;
	}

	/** Filter games by team */

	static async gamesByTeam(teamId) {
		let res = await this.request(`games/filter/team/${teamId}`);
		return res.games;
	}

	/** Get all picks placed for a particular game */

	static async gamePicks(gameId) {
		let res = await this.request(`games/${gameId}/picks`);
		return res.picks;
	}

	// DEPRECATED SINCE MOVING UPDATES TO BACKEND

	/** Update all team game stats */

	// static async updateAllTeamGameStats() {
	// 	await this.adminRequest(`update/teams/games`, { method: 'all' });
	// }

	// /** Update team game stats for recent games */

	// static async updateTeamGameStats() {
	// 	await this.adminRequest(`update/teams/games`);
	// }

	// /** Update all team season stats */

	// static async updateTeamStats() {
	// 	let res = await this.adminRequest(`update/teams/season`);
	// 	return res.updateTeamStats;
	// }

	// /** Update all player season stats */

	// static async updatePlayerSeasonStats() {
	// 	let res = await this.adminRequest(`update/players/season`);
	// 	return res.updatePlayerSeasonStats;
	// }

	// /** Update all player game stats by gameId */

	// static async updatePlayerGameStats(gameId) {
	// 	let res = await this.adminRequest(`update/players/game/${gameId}`);
	// 	return res.updatePlayerGameStats;
	// }

	// /** Update all player game stats */

	// static async updateAllPlayerGameStats() {
	// 	let res = await this.adminRequest(`update/players/games`, { method: 'all' });
	// 	return res.updatePlayerGameStats;
	// }

	// /** Update recent player game stats */

	// static async updateRecentPlayerGameStats() {
	// 	let res = await this.adminRequest(`update/players/games`);
	// 	return res.updatePlayerGameStats;
	// }

	// /** Update all games in database */

	// static async updateAllGames() {
	// 	let res = await this.adminRequest(`update/games/all`);
	// 	return res.updateAllGames;
	// }

	// /** Update recent games (yesterday and today) */

	// static async updateRecentGames() {
	// 	let res = await this.adminRequest(`update/games/recent`);
	// 	return res.updateRecentGames;
	// }

	// /** Update player picks (all open picks will be checked if the game is
	//  *  finished)
	//  */

	// static async updatePlayerPicks() {
	// 	let res = await this.adminRequest(`update/picks/players`);
	// 	return res.updatePlayerPicks;
	// }

	// /** Update team picks (all open picks will be checked if the game is
	//  *  finished)
	//  */

	// static async updateTeamPicks() {
	// 	let res = await this.adminRequest(`update/picks/teams`);
	// 	return res.updateTeamPicks;
	// }
}

export default OnlyLocksAPI;
