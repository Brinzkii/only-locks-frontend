import axios from 'axios';

const BASE_API_URL = 'http://localhost:3001/';

class OnlyLocksAPI {
	// the token for interacting with API will be stored here/
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${BASE_API_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${localStorage.token}` };
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
		let res = await this.request(`users/${username}/players/${playerId}`, 'post');
		return res.user;
	}

	/** Follow team */

	static async followTeam({ username, teamId }) {
		let res = await this.request(`users/${username}/teams/${teamId}`, 'post');
		return res.user;
	}

	/** Unfollow player */

	static async unfollowPlayer({ username, playerId }) {
		let res = await this.request(`users/${username}/players/${playerId}`, 'delete');
		return res.user;
	}

	/** Unfollow team */

	static async unfollowTeam({ username, teamId }) {
		let res = await this.request(`users/${username}/teams/${teamId}`, 'delete');
		return res.user;
	}

	/** Get user picks */

	static async userPicks(username) {
		let res = await this.request(`users/${username}/picks`);
		return res.picks;
	}

	/** New player pick */

	static async playerPick({ username, playerId, gameId, stat, over_under, value }) {
		let res = await this.request(
			`users/${username}/picks/players`,
			{ username, playerId, gameId, stat, over_under, value },
			'post'
		);
		return res.pick;
	}

	/** Remove player pick */

	static async deletePlayerPick({ username, pickId }) {
		let res = await this.request(`users/picks/players/${pickId}`, 'delete');
		return res.removed;
	}

	/** New team pick */

	static async teamPick({ username, teamId, gameId, win_spread, value }) {
		let res = await this.request(
			`users/${username}/picks/teams`,
			{ username, teamId, gameId, win_spread, value },
			'post'
		);
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

	/** Get all team stats */

	static async allTeamStats() {
		let res = await this.request(`teams/stats`);
		return res.teamStats;
	}

	/** Get team stats */

	static async teamStats(teamId) {
		let res = await this.request(`teams/${teamId}/stats`);
		return res.teamStats;
	}

	/** Sort all teams by stats */

	static async sortTeamStats({ stat, order }) {
		let res = await this.request(`teams/stats/sort`, { stat, order });
		return res.teamStats;
	}

	/** Update all team stats */

	static async updateTeamStats() {
		let res = await this.request(`teams/stats`, 'patch');
		return res.updateTeamStats;
	}

	/** List of teams games */

	static async teamGames(teamId) {
		let res = await this.request(`teams/${teamId}/games`);
		return res.teamGames;
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

	/** Update all player season stats */

	static async updatePlayerSeasonStats() {
		let res = await this.request(`players/stats/season`, 'patch');
		return res.updatePlayerSeasonStats;
	}

	/** Update all player game stats */

	static async updateAllPlayerGameStats() {
		let res = await this.request(`players/stats/games`, { method: 'all' }, 'patch');
		return res.updatePlayerGameStats;
	}

	/** Update recent player game stats */

	static async updatePlayerGameStats() {
		let res = await this.request(`players/stats/games`, 'patch');
		return res.updatePlayerGameStats;
	}

	/** Get a players game stats */

	static async playerGameStats({ playerId, gameId }) {
		let res = await this.request(`players/${playerId}/stats/game/${gameId}`);
		return res.gameStats;
	}

	/** Sort all players by stats */

	static async sortPlayerStats({ time, stat, order }) {
		let res = await this.request(`players/stats/sort`, { time, stat, order });
		return res.sortedStats;
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
}

export default OnlyLocksAPI;
