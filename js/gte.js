let randomElement, elements, gameMode, finishedLoop;
let gameModeDiv = document.getElementById("mode");
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

window.onload = async function () {
	input.focus();

	if (!gameMode) {
		gameMode = 'symbol';
		gameModeDiv.innerHTML = `Game Mode: ${gameMode}`
	};

	let response = await fetch('../elements.json');
	let json = await response.json();
	elements = json['elements'];
	await restart(true);
	document.body
	    .addEventListener('keyup', async function(event) {
			if (event.code === 'Enter' | event.keyCode === 13) {
				event.preventDefault();
				if (finishedGuessing) {
					await restart();
				} else {
					await guess();
				};
	        };
	    });
	window.addEventListener('mouseup', function(event){
        if(event.target != fontDiv && event.target.parentNode != fontDiv){
            fontDiv.style.display = 'none';
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
	let newElementInfo = document.createElement('div');
	newElementInfo.innerHTML = `<h3>${randomElement['name']}</h3>\n<p>Symbol: <span class="symbol">${randomElement['symbol']}</span></p>\n<p>Atomic Mass: <span class="atomic-mass">${randomElement['atomic_mass']}</span></p>\n<p>Atomic Number: <span class="atomic-number">${randomElement['number']}</span></p>\n<p>Category: <span class="category">${randomElement['category']}</span></p>`;
	elementInfo.insertBefore(newElementInfo, elementInfo.firstChild);
	const oldElement = randomElement['name'];
	const oldValue = input.value;
	await restart();
	if (oldValue.toLowerCase().replace(/\s/g, '') === oldElement.toLowerCase()) {
		points['correct']++;
		await updatePoints();
		await showStatus('correct');
	} else {
		await updatePoints();
		await showStatus('wrong');
	};
}

async function restart(skipPoints=false) {
	if (doneElements.length == elements.length) {
		await reset();
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

	elementDiv.innerText = randomElement[gameMode.toLowerCase()];

	let inputs = document.getElementsByTagName('input');
	let spaces = document.getElementsByClassName('space');
	for (i=0; i < inputs.length; i++) { inputs[i].style.display = 'unset'; };
	for (i=0; i < spaces.length; i++) { spaces[i].style.display = 'none'; };
	input.value = '';
	input.focus();
	finishedGuessing = false;
	if (!skipPoints) {
		points['total']++;
		await updatePoints();
	};
};

async function changeMode() {
	switch(gameMode) {
		case 'symbol':
			gameMode = 'number';
			break;
		case 'number':
			gameMode = 'symbol';
			break;
	};
	gameModeDiv.innerHTML = `Game Mode: ${gameMode}`;
	await reset(true);
	await restart();
}

async function reset(resetPoints=false) {
	doneElements = [];
	randomElement = await getRandomElement();
	elementInfo.innerHTML = '';

	if (resetPoints) {
		points = {
			total: -1,
			correct: 0
		};
	}
}