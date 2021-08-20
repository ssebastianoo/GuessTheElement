let randomElement;
let elements;
let input = document.getElementById('input');
let finishedGuessing = false;
let elementDiv = document.getElementById('element');
let elementInfo = document.getElementById('info');
let points = {
	total: 0,
	correct: 0
};
let pointsItem = document.getElementById('points');
let doneElements = [];
let finishedLoop;

window.onload = async function () {
	document.getElementById('input').focus();

	let response = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');
	let json = await response.json();
	elements = json['elements'];
	await restart(true);
	document.body
	    .addEventListener('keyup', async function(event) {
	        if (event.code === 'Enter' | event.keyCode === 13)
	        {
	            event.preventDefault();
							if (finishedGuessing) {
								await restart();
							} else {
								await guess();
							}
	        }
	    });
	await updatePoints();
}

async function getRandomElement() {
	return elements[Math.floor(Math.random() * elements.length)];
}

async function guess() {
	if (!input.value) {
		return;
	};
	finishedGuessing = true;
	if (input.value.toLowerCase() == randomElement['name'].toLowerCase()) {
		points['correct']++;
	};
	let newElementInfo = document.createElement('div');
	newElementInfo.innerHTML = `<h3>${randomElement['name']}</h3>\n<p>Symbol: <span class="symbol">${randomElement['symbol']}</span></p>\n<p>Atomic Mass: <span class="atomic-mass">${randomElement['atomic_mass']}</span></p>\n<p>Atomic Number: <span class="atomic-number">${randomElement['number']}</span></p>\n<p>Category: <span class="category">${randomElement['category']}</span></p>`;
	elementInfo.insertBefore(newElementInfo, elementInfo.firstChild);
	await updatePoints();
	await restart();
}

async function restart(skipPoints=false) {
	if (doneElements.length == elements.length) {
		doneElements = [];
		randomElement = await getRandomElement();
		elementInfo.innerHTML = '';
	} else {
		finishedLoop = false;
		while (!finishedLoop) {
			randomElement = await getRandomElement();
			if (!doneElements.includes(randomElement)) {
				finishedLoop = true;
			};
		};
		doneElements.push(randomElement);
	};
	elementDiv.innerText = randomElement['symbol'];
	let inputs = document.getElementsByTagName('input');
	let spaces = document.getElementsByClassName('space');
	for (i=0; i < inputs.length; i++) {
		inputs[i].style.display = 'unset';
	};
	for (i=0; i < spaces.length; i++) {
		spaces[i].style.display = 'none';
	};
	input.value = '';
	input.focus();
	finishedGuessing = false;
	if (!skipPoints) {
		points['total']++;
		await updatePoints();
	};
}

async function updatePoints() {
	pointsItem.innerText = `${points['correct']} / ${points['total']}`;
}
