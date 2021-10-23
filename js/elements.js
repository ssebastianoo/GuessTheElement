let elementName = document.getElementById('element-name');
let elementSymbol = document.getElementById('element-symbol');
let elementNumber = document.getElementById('element-number');
let input = document.getElementById('input');
let elements;

window.onload = async function () {
	input.focus();

	let response = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');
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
    let index = elements.filter(element => [element.name.toLowerCase(), element.symbol.toLowerCase(), element.number.toString()].includes(input.value.toLowerCase()));
    if (index.length === 0) {
        elementNumber.innerText = 404;
		elementSymbol.innerText = 'Nf';
		elementName.innerText = 'Not found';
		return;
    };
	elementNumber.innerText = `${index[0].number}`;
	elementSymbol.innerText = `${index[0].symbol}`;
    elementName.innerText = `${index[0].name}`;
    input.value = '';
}