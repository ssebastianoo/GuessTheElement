let randomElement;
let elements;

window.onload = async function () {
	let response = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');
	let json = await response.json();
	elements = json['elements'];
	randomElement = await getRandomElement();
	let elementDiv = document.getElementById('element');
	elementDiv.innerText = randomElement['symbol']
}

async function getRandomElement() {
	return elements[Math.floor(Math.random() * elements.length)];
}

async function guess() {
	let input = document.getElementById('input');
	if (!input.value) {
		return;
	};
	let status = document.getElementById('status');
	if (input.value.toLowerCase() == randomElement['name'].toLowerCase()) {
		status.innerText = 'you won';
		status.className = 'success';
	} else {
		status.innerText = 'you lost';
		status.className = 'failure';
	}
}

async function restart() {
	randomElement = await getRandomElement();
	let elementDiv = document.getElementById('element');
	elementDiv.innerText = randomElement['symbol']
}
