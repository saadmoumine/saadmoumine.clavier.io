const qwertyKeysUppercase = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const qwertyKeysLowercase = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

const azertyKeysUppercase = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'W', 'X', 'C', 'V', 'B', 'N'];
const azertyKeysLowercase = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n'];

function toggleCase() {
    currentLayout.isUppercase = !currentLayout.isUppercase;
    const keys = currentLayout.isUppercase ? currentLayout.keys : currentLayout.keys.map(key => key.toLowerCase());
    generateKeyboard(keys);
}

document.getElementById('toggleCase').addEventListener('click', toggleCase);

let currentLayout = { keys: qwertyKeysUppercase, isUppercase: true };

function handleDelete() {
    const outputTextarea = document.getElementById('output');
    outputTextarea.value = outputTextarea.value.slice(0, -1);
}

function handleButtonClick(key) {
    const outputTextarea = document.getElementById('output');

    if (key === 'Delete') {
        handleDelete();
    } else if (key === 'Space') {
        outputTextarea.value += ' ';
    } else if (key === 'Enter') {
        outputTextarea.value += '\n';
    } else {
        outputTextarea.value += key;
    }
}

function generateKeyboard(layout) {
    const keyboardElement = document.querySelector('.keyboard');
    keyboardElement.innerHTML = '';

    let currentRow = 1;

    layout.forEach((key) => {
        const keyButton = document.createElement('button');
        keyButton.className = `key row-${currentRow}`;
        keyButton.setAttribute('data-key', key);

        const keyImage = document.createElement('img');
        keyImage.src = `images/${key.toLowerCase()}_sign.jpg`;
        keyImage.alt = `${key} Sign`;
        keyButton.appendChild(keyImage);

        keyButton.addEventListener('click', () => {
            handleButtonClick(key);
        });

        keyboardElement.appendChild(keyButton);

        if (currentRow % 10 === 0) {
            currentRow++;
        }
    });
}

document.getElementById('delete').addEventListener('click', handleDelete);

document.getElementById('qwerty').addEventListener('click', () => {
    currentLayout = { keys: qwertyKeysUppercase, isUppercase: true };
    generateKeyboard(currentLayout.keys);
});

document.getElementById('azerty').addEventListener('click', () => {
    currentLayout = { keys: azertyKeysUppercase, isUppercase: true };
    generateKeyboard(currentLayout.keys);
});

document.getElementById('space').addEventListener('click', () => {
    handleButtonClick('Space');
});

document.getElementById('enter').addEventListener('click', () => {
    handleButtonClick('Enter');
});

document.querySelector('.keyboard').addEventListener('click', (event) => {
    const key = event.target.getAttribute('data-key');
    if (key) {
        handleButtonClick(key);
    }
});

generateKeyboard(currentLayout.keys);
