let fontDiv = document.getElementById('chooseFont');
let status = document.getElementById('hoverStatus');
let fonts = {
	'roboto': "'Roboto', sans-serif",
	'urbanist': "'Urbanist', sans-serif",
	'patrick hand': "'Patrick Hand', cursive",
	"klee one": "'Klee One', cursive",
	"besley": "'Besley', serif",
	"ubuntu mono": "'Ubuntu Mono', monospace"
};

async function updatePoints() { pointsItem.innerText = `${points['correct']} / ${points['total']}`; };

async function showStatus(type) {
	status.style.display = 'unset';

	switch(type) {
		case 'correct':
			status.firstChild.innerText = 'Correct'; 
			status.firstChild.style.background = 'RGBA(109, 232, 142, 0.5)';
			break;

		case 'wrong':
			status.firstChild.innerText = 'Wrong';
			status.firstChild.style.background = 'RGBA(235, 94, 94, 0.5)'
			break;

		case 'not found':
			status.firstChild.innerText = 'Element not found';
			status.firstChild.style.background = 'RGBA(227, 47, 41, 0.5)'
			break;
	};
	await timeout(1000);
	status.style.display = 'none';
};

async function showFonts() {
	fontDiv.style.display = 'unset';
};

async function changeFont(font) {
	document.body.style.fontFamily = fonts[font];
	input.style.fontFamily = fonts[font];
}

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
