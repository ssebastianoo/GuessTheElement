#!/usr/bin/env node

const fs = require('fs');
const path = require('path')
const rs =require('readline-sync');
const chalk = require('chalk');
let rawdata = fs.readFileSync(path.resolve(__dirname, '../elements.json'));
let elements = JSON.parse(rawdata)['elements'];
let randomElement;
let doneElements = [];
let finishedLoop;
let points = {
	total: 0,
	correct: 0
};

function getRandomElement() {
	if (doneElements.length == elements.length) {
		doneElements = [];
		randomElement = elements[Math.floor(Math.random() * elements.length)];
	} else {
		finishedLoop = false;
		while (!finishedLoop) {
			randomElement = elements[Math.floor(Math.random() * elements.length)];;
			if (!doneElements.includes(randomElement)) {
				finishedLoop = true;
			};
		};
		doneElements.push(randomElement);
	};
	return randomElement;
}

console.log(
	"Welcome to the " + chalk.yellow("CLI") + " version of " + chalk.bgCyan.bold("Guess The Element") + "!\nTry guessing elements by only " + chalk.bold("knowing their symbol!") + chalk.green("\nGood luck!\n")
)

while (true) {
	randomElement = getRandomElement();
	var answer = rs.question(chalk.cyanBright.bold(randomElement.symbol) + chalk.yellow(` ${points['correct']}/${points['total']}\n`));
	input = answer.replace(/\s/g, '').toLowerCase();
	points['total']++;
	if (input === randomElement.name.toLowerCase()) {
		points['correct']++;
		console.log(chalk.green("Correct!\n"));
	} else {
		console.log(chalk.red("Wrong! It was " + chalk.bold(randomElement.name) + "\n"));
	};
}
