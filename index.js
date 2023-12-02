const request = require("request");
const fs = require("fs");

const API_URI = "https://icanhazdadjoke.com/search?term";

const humorousMessages = [
	"Get ready to burst into laughter—joke incoming!",
	"Hold on tight! Your laugh-inducing joke is on its way!",
	"Brace yourself for a joke that's about to tickle your funny bone!",
	"Alert: Hilarious joke detected. Prepare to LOL!",
	"Incoming joke transmission: Prepare for amusement!",
	"Good news! A joke has been located and is heading your way.",
	"Your keyword has summoned a joke! Get ready to chuckle!",
	"Joke detected! Get ready for a humor infusion.",
	"Your laughter prescription has been filled. Joke imminent!",
	"Great news! A joke is on the horizon, and it's heading straight to you!",
];

const wittyNotFoundMessages = [
	"Looks like the joke is on vacation! Try another keyword.",
	"The joke gods are taking a day off. Maybe try something else?",
	"No jokes here, just an empty punchline abyss. Try a different keyword!",
	"404: Joke not found. Please choose a different keyword.",
	"Even jokes need coffee breaks. Try again with a different keyword.",
	"Uh-oh! The joke's hiding. Give it another shot with a different keyword.",
	"The joke went on a walkabout. Try a different keyword and maybe it'll come back.",
	"It's a joke-free zone here. Try a different keyword for a laugh.",
	"Joke not found. Maybe it's playing hide and seek. Try another keyword!",
	"Looks like the joke's playing hooky. Try a different keyword and catch it later.",
];

const wittyLeaderboardNotFoundMessages = [
	"The leaderboard seems to be on a humor diet. No jokes to display!",
	"Looks like the jokes in the leaderboard are playing hide and seek. Try again later.",
	"The joke leaderboard is taking a break, probably sipping coffee somewhere. No jokes found!",
	"404: Jokes not found in the leaderboard. It's a laughter desert!",
	"Even the leaderboard needs a nap. No jokes in sight!",
	"Oops! The joke leaderboard is practicing social distancing. No jokes allowed!",
	"The joke leaderboard is MIA (Missing In Amusement). Try again with a different search or check back later.",
	"It's a quiet day in the leaderboard town. No jokes here. Try a different query!",
	"Jokes on strike! The leaderboard is currently jokeless. Try another time.",
	"The joke leaderboard is on vacation. No humor to report at the moment.",
];
const args = process.argv[2];

if (args.toLowerCase() === "leaderboard") {
	displayTheLeaderboard();
} else {
	findJokes(args);
}

function findJokes(keyword) {
	console.log(`Searching a joke based on ${keyword}`);

	const options = {
		url: `${API_URI}=${keyword}`,
		headers: { Accept: "application/json" },
	};
	var result = null;

	request(options, (err, res, body) => {
		// console.log(res);
		if (!err) {
			result = JSON.parse(body).results;

			if (result && result.length) {
				const data = result[Math.floor(Math.random() * result.length)];

				console.log(
					`${
						humorousMessages[
							Math.floor(Math.random() * humorousMessages.length)
						]
					}\n\n${data.joke}
                    `
				);

				fs.appendFileSync("jokes.txt", `${data.joke}\n\n`);

				setTimeout(() => {
					console.log("Joke saved to jokes.txt for future laughs");
				}, 1500);
			} else {
				console.log(
					wittyNotFoundMessages[
						Math.floor(Math.random() * wittyNotFoundMessages.length)
					]
				);
			}
		} else {
			console.log(
				"Oops! It seems the joke delivery truck hit a pothole. Our team of highly trained comedians is on it, attempting to fix the hilarity glitch. Please stand-up, stretch, and try again in a moment. Laughter will resume shortly!"
			);
		}
	});
}

function displayTheLeaderboard() {
	fs.readFile("jokes.txt", "utf8", (err, data) => {
		if (err) {
			console.log(
				"No jokes found in the leaderboard. Start saving some jokes!"
			);
		} else {
			const jokes = data.split("\n").filter((joke) => joke.trim() !== "");
			if (jokes.length > 0) {
				const jokeObj = {};

				for (let i = 0; i < jokes.length; i++) {
					if (jokeObj[jokes[i]]) jokeObj[jokes[i]]++;
					else jokeObj[jokes[i]] = 1;
				}

				var leaderboardJokes = [];

				for (let key in jokeObj) {
					leaderboardJokes.push([key, jokeObj[key]]);
				}
				leaderboardJokes = leaderboardJokes.sort((a, b) => b[1] - a[1]);

				const len = Math.min(leaderboardJokes.length, 5);

				console.log(
					`The top ${len} searched jokes in the leaderboard are:\n--------------------------------------\n`
				);

				for (let i = 0; i < len; i++) {
					console.log(
						`${i + 1}. ${leaderboardJokes[i][0]}\n(Appeared : ${
							leaderboardJokes[i][1]
						} ${
							leaderboardJokes[i][1] === 1 ? "time" : "times"
						})\n---------------------------------------\n`
					);
				}
				console.log(`\n\nKeep laughing!`);
			} else {
				console.log(
					wittyLeaderboardNotFoundMessages[
						Math.floor(Math.random() * wittyLeaderboardNotFoundMessages.length)
					]
				);
			}
		}
	});
}
