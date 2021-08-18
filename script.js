let randomElement;
let elements;
let finishedGuessing = false;

window.onload = async function () {
	document.getElementById('input').focus();

	let response = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');
	let json = await response.json();
	elements = json['elements'];
	randomElement = await getRandomElement();
	let elementDiv = document.getElementById('element');
	elementDiv.innerText = randomElement['symbol'];
	document.body
	    .addEventListener('keyup', function(event) {
	        if (event.code === 'Enter')
	        {
	            event.preventDefault();
							console.log(finishedGuessing);
							if (finishedGuessing) {
								document.getElementById('restart').click();
							} else {
								document.getElementById('guessButton').click();
							}
	        }
	    });
}

async function getRandomElement() {
	return elements[Math.floor(Math.random() * elements.length)];
}

async function guess() {
	finishedGuessing = true;
	let input = document.getElementById('input');
	if (!input.value) {
		return;
	};
	let elementInfo = document.getElementById('elementInfo');
	let status = document.getElementById('status');
	let inputs = document.getElementsByTagName('input');
	let spaces = document.getElementsByClassName('space');
	if (input.value.toLowerCase() == randomElement['name'].toLowerCase()) {
		status.innerText = 'you won';
		status.className = 'success';
	} else {
		status.innerText = `you lost`;
		status.className = 'failure';
	};

	for (i=0; i < inputs.length; i++) {
		inputs[i].style.display = 'none';
	};
	for (i=0; i < spaces.length; i++) {
		spaces[i].style.display = 'unset';
	};
	elementInfo.style.display = 'inline-block';
	elementInfo.innerHTML = `<h3>${randomElement['name']}</h3>\n<p>Atomic Mass: ${randomElement['atomic_mass']}</p>\n<p>Atomic Number: ${randomElement['number']}</p>\n<p>Category: ${randomElement['category']}</p>`
}

async function restart() {
	document.getElementById("elementInfo").style.display = "none";
	randomElement = await getRandomElement();
	let elementDiv = document.getElementById('element');
	elementDiv.innerText = randomElement['symbol'];
	let inputs = document.getElementsByTagName('input');
	let spaces = document.getElementsByClassName('space');
	for (i=0; i < inputs.length; i++) {
		inputs[i].style.display = 'unset';
	};
	for (i=0; i < spaces.length; i++) {
		spaces[i].style.display = 'none';
	};
	let input = document.getElementById('input');
	input.value = '';
	input.focus();
	finishedGuessing = false;
}
