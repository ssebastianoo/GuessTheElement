const codes = [
    {
        "code": ". _",
        "value": "A"
    },
    {
        "code": "_ . . .",
        "value": "B"
    },
    {
        "code": "_ . _ .",
        "value": "C"
    },
    {
        "code": "_ . .",
        "value": "D"
    },
    {
        "code": ".",
        "value": "E"
    },
    {
        "code": ". . _ .",
        "value": "F"
    },
    {
        "code": "_ _ .",
        "value": "G"
    },
    {
        "code": ". . . .",
        "value": "H"
    },
    {
        "code": ". .",
        "value": "I"
    },
    {
        "code": ". _ _ _",
        "value": "J"
    },
    {
        "code": "_ . _",
        "value": "K"
    },
    {
        "code": ". _ . .",
        "value": "L"
    },
    {
        "code": "_ _",
        "value": "M"
    },
    {
        "code": "_ .",
        "value": "N"
    },
    {
        "code": "_ _ _",
        "value": "O"
    },
    {
        "code": ". _ _ .",
        "value": "P"
    },
    {
        "code": "_ _ . _",
        "value": "Q"
    },
    {
        "code": ". _ .",
        "value": "R"
    },
    {
        "code": ". . .",
        "value": "S"
    },
    {
        "code": "_",
        "value": "T"
    },
    {
        "code": ". . _",
        "value": "U"
    },
    {
        "code": ". . . _",
        "value": "V"
    },
    {
        "code": ". _ _",
        "value": "W"
    },
    {
        "code": "_ . . _",
        "value": "X"
    },
    {
        "code": "_ . _ _",
        "value": "Y"
    },
    {
        "code": "_ _ . .",
        "value": "Z"
    }
];

let output = document.getElementById('output');
let input = document.getElementById('input');
let result = document.getElementById('result');
let mode = 'gv';
let randomCode;

window.onload = async function() {
    input.focus();
    await randomize();

    document.body
        .addEventListener('keyup', async function(event) {
            if (event.code === 'Enter' | event.keyCode === 13) {
                event.preventDefault();
                await guess();
            }; 
        });
};

async function changeMode() {
    switch (mode) {
        case 'gc':
            mode = 'gv';
            break;
        case 'gv':
            mode = 'gc';
            break;
    };
    await randomize();
}

async function randomize() {
    randomElement = codes[Math.floor(Math.random() * codes.length)];

    switch (mode) {
        case 'gc':
            output.innerHTML = randomElement.code;
            break
        case 'gv':
            output.innerHTML = randomElement.value;
            break
    }
}

async function guess() {
    if (input.value.toLowerCase().replace(/\s/g, '') === (mode === 'gc' ? randomElement.value.toLowerCase().replace(/\s/g, '') : randomElement.code.replace(/\s/g, ''))) {
        result.innerHTML = 'You guessed correctly!';
    } else {
        result.innerHTML = `You guessed wrong, ${mode === 'gc' ? `${randomElement.code} was ${randomElement.value}` : `${randomElement.value} was ${randomElement.code}`}`;
    };
    input.innerHTML = '';
    await randomize();
}