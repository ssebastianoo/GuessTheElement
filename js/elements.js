let elementName = document.getElementById('element-name');
let elementSymbol = document.getElementById('element-symbol');
let elementNumber = document.getElementById('element-number');
let input = document.getElementById('input');
let elements;

window.onload = async function () {
	input.focus();
	let response = await fetch('https://raw.githubusercontent.com/ssebastianoo/GuessTheElement/master/elements.json');
	let json = await response.json();
	elements = json['elements'];
	document.body
	    .addEventListener('keyup', async function(event) {
			if (event.code === 'Enter' | event.keyCode === 13) {
				event.preventDefault();
				await searchElement();
	        }; 
	    });
	window.addEventListener('mouseup', function(event){
        if(event.target != fontDiv && event.target.parentNode != fontDiv){
            fontDiv.style.display = 'none';
        }
  	});
};

async function searchElement() {
	let inputValue = input.value.toLowerCase().replace(/\s/g, '');
    let index = elements.filter(element => [element.name.toLowerCase(), element.symbol.toLowerCase(), element.number.toString()].includes(inputValue));
    if (index.length === 0) {
		index = elements.filter(element => element.names.includes(inputValue));
		if (index.length === 0) {
			elementNumber.innerText = 404;
			elementSymbol.innerText = 'Nf';
			elementName.innerText = 'Not found';
			return;
		};
    };
	let element = index[0];
	elementNumber.innerText = `${element.number}`;
	elementSymbol.innerText = `${element.symbol}`;
    elementName.innerText = `${element.name}`;
    input.value = '';
}