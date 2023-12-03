const request = require("request");
const fs = require("fs");

const API_URI = "https://icanhazdadjoke.com/search?term";

// Getting the SearchTerm from commandline.
const args = process.argv[2];
// <-------------------------->

// Humorous Messages templates which will pass with the retrieved joke from the API .
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
// <------------------------------->

// Message templates if the user dont provide the keyword (searchterm).
const funnyKeywordMissingMessages = [
	"Hold up! We need a keyword to find the funny. Type in something hilarious!",
	"No keyword, no jokes! Quick, type in a word and let the laughter begin!",
	"Keyword needed: Our joke-finding ducks are quacking impatiently. What's the word?",
	"Error 101: Keyword Missing! Please enter a funny keyword to unlock the humor vault.",
	"Attention humor-seeker: The keyword slot is feeling lonely. Fill it up for instant laughs!",
	"Knock, knock. Who's there? Oh wait, we need a keyword first! Type in something funny!",
	"No keyword, no punchline! It's like trying to tell a joke without setup. Enter a keyword, please!",
	"Houston, we have a problem. No keyword detected! Please provide a funny word or phrase.",
	"Our joke engine is fueled by keywords. Without one, it's like trying to fly without wings. Enter a keyword, and let's soar!",
	"Hold your horses! We're missing a keyword, and jokes can't gallop without it. Type something amusing!",
];
// <--------------------------------->

// Message templates for error 404 (Joke not found from the API).
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
// <-------------------------------->

// Message templates for empty leaderboard.
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
// <-------------------------->

if (!args) {
	console.log(
		// Printing a random funny message if the keyword is missing
		funnyKeywordMissingMessages[
			Math.floor(Math.random() * funnyKeywordMissingMessages.length)
		]
	);
} else if (args.toLowerCase() === "leaderboard") {
	displayTheLeaderboard();
} else {
	findJokes(args);
}

function findJokes(keyword) {
	console.log(`Searching a joke based on "${keyword}".`);

	const options = {
		url: `${API_URI}=${keyword}`,
		headers: { Accept: "application/json" },
	};
	var result = null;

	// Fetching the joke from API
	request(options, (err, res, body) => {
		if (!err) {
			result = JSON.parse(body).results;

			if (result && result.length) {
				const data = result[Math.floor(Math.random() * result.length)];

				console.log(
					`${
						humorousMessages[
							Math.floor(Math.random() * humorousMessages.length) //printing a random humourous Message with the  retrieved joke from the API.
						]
					}\n\n----------------------------------------\n${
						data.joke
					}\n----------------------------------------
                    `
				);

				fs.appendFileSync("jokes.txt", `${data.joke}\n\n`); // Adding the joke to the file "joke.txt"

				setTimeout(() => {
					console.log("Joke saved to jokes.txt for future laughs");
				}, 1500);
			} else {
				console.log(
					wittyNotFoundMessages[
						Math.floor(Math.random() * wittyNotFoundMessages.length) // Printing a random Message from wittyNotFoundMessages array
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
		//Reading the txt file
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

				//Creating the leaderboard.

				for (let key in jokeObj) {
					leaderboardJokes.push([key, jokeObj[key]]);
				}
				leaderboardJokes = leaderboardJokes.sort((a, b) => b[1] - a[1]);

				const len = Math.min(leaderboardJokes.length, 5);

				// Printing the leaderboard.
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
				// Printing a random Message from wittyLeaderboardNotFoundMessages array
				console.log(
					wittyLeaderboardNotFoundMessages[
						Math.floor(Math.random() * wittyLeaderboardNotFoundMessages.length)
					]
				);
			}
		}
	});
}
