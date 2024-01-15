import Moment from 'moment';

class Utils {
	static generatePickOptions(stat, avg) {
		let pickOptions = [];
		let count = 0;
		switch (stat) {
			case 'points':
				if (avg < 15) {
					for (let i = avg - 3; i <= avg + 3; i++) {
						pickOptions.push({ value: count, name: i });
						count++;
					}
				} else {
					for (let i = avg - 6; i <= avg + 6; i += 2) {
						pickOptions.push({ value: count, name: i });
						count++;
					}
				}
				break;

			case 'tpm':
				if (avg <= 2) {
					for (let i = 1; i <= 4; i++) {
						pickOptions.push({ value: count, name: i });
						count++;
					}
				} else {
					for (let i = 2; i <= 5; i++) {
						pickOptions.push({ value: count, name: i });
						count++;
					}
				}
				break;

			case 'rebounds':
			case 'assists':
				if (avg <= 4) {
					for (let i = 2; i <= 6; i++) {
						pickOptions.push({ value: count, name: i });
						count++;
					}
				} else {
					for (let i = avg - 2; i <= avg + 2; i++) {
						pickOptions.push({ value: count, name: i });
						count++;
					}
				}
				break;

			case 'blocks':
				if (avg <= 2) {
					for (let i = 1; i <= 3; i++) {
						pickOptions.push({ value: count, name: i });
						count++;
					}
				} else {
					for (let i = avg - 1; i <= avg + 1; i++) {
						pickOptions.push({ value: count, name: i });
						count++;
					}
				}
				break;

			case 'steals':
				for (let i = 1; i <= 3; i++) {
					pickOptions.push({ value: count, name: i });
					count++;
				}
				break;

			default:
				break;
		}
		return pickOptions;
	}

	static calcPlayerPickPointValue(stat, overUnder, idx) {
		const overPointConversion = {
			0: 25,
			1: 50,
			2: 75,
			3: 100,
			4: 125,
			5: 150,
			6: 175,
		};
		const underPointConversion = {
			0: 175,
			1: 150,
			2: 125,
			3: 100,
			4: 75,
			5: 50,
			6: 25,
		};
		const overThreesConversion = {
			0: 25,
			1: 50,
			2: 125,
			3: 175,
		};
		const underThreesConversion = {
			0: 175,
			1: 125,
			2: 50,
			3: 25,
		};
		const overAssistsAndReboundConversion = {
			0: 25,
			1: 50,
			2: 100,
			3: 150,
			4: 175,
		};
		const underAssistsAndReboundConversion = {
			0: 175,
			1: 150,
			2: 100,
			3: 50,
			4: 25,
		};
		const overStealsAndBlocksConversion = {
			0: 50,
			1: 125,
			2: 175,
		};
		const underStealsAndBlocksConversion = {
			0: 50,
			1: 125,
			2: 175,
		};

		switch (overUnder) {
			case 'under':
				switch (stat) {
					case 'points':
						return underPointConversion[idx];

					case 'tpm':
						return underThreesConversion[idx];

					case 'assists':
					case 'rebounds':
						return underAssistsAndReboundConversion[idx];

					case 'steals':
					case 'blocks':
						return underStealsAndBlocksConversion[idx];

					default:
						return undefined;
				}

			case 'over':
				switch (stat) {
					case 'points':
						return overPointConversion[idx];

					case 'tpm':
						return overThreesConversion[idx];

					case 'assists':
					case 'rebounds':
						return overAssistsAndReboundConversion[idx];

					case 'steals':
					case 'blocks':
						return overStealsAndBlocksConversion[idx];

					default:
						return undefined;
				}

			default:
				return undefined;
		}
	}

	static createEvents(games, team = undefined) {
		if (team) {
			return games.map((g) => ({
				title:
					g.home.id === team.id
						? `VS ${g.away.code} ${g.score !== 'TBD' ? g.score : ''}`
						: `@ ${g.home.code} ${g.score !== 'TBD' ? g.score : ''}`,
				start: Moment(g.date),
				end: Moment(g.date),
				allDay: false,
				resource: { game: g, team },
			}));
		} else {
			return games.map((g) => ({
				title: `${
					g.score !== 'TBD' ? `${g.home.code} ${g.score} ${g.away.code}` : `${g.home.code} vs. ${g.away.code}`
				}`,
				start: Moment(g.date),
				end: Moment(g.date),
				allDay: false,
				resource: { game: g },
			}));
		}
	}
}

export default Utils;
