const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen');
let gridSize = 50;

const createPixel = () => {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = 'white';
    return pixel;
};

const drawGrid = (screenSize) => {
    screen.innerHTML = '';
    for (let i = 0; i < screenSize ** 2; i++) {
        screen.appendChild(createPixel());
    }
    screen.style.gridTemplateColumns = `repeat(${screenSize}, auto)`;
    screen.style.gridTemplateRows = `repeat(${screenSize}, auto)`;
};

const clear = (request) => {
    if (request === 'resize') {
        gridSize = prompt('Please enter the new pixel size (not more than 100)', 50) || 100;
    }
    drawGrid(gridSize);
    active();
};

const randomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
};

const shading = (clr) => {
    let color = 'rgba(';
    const components = clr.match(/\d+/g).map(Number);

    components[0] = Math.max(0, components[0] - 5);
    components[1] = Math.max(0, components[1] - 5);
    components[2] = Math.max(0, components[2] - 5);

    for (let i = 0; i < 3; i++) {
        color += `${components[i]},`;
    }

    return color + '1)';
};

const handleButtonClick = (button) => {
    if (button.id === 'resize' || button.id === 'clear') {
        clear(button.id);
    } else {
        activeMode = button.id;
        clear(button.id);
    }
};

let activeMode = 'black';

const handlePixelHover = (e) => {
    const crntClr = getComputedStyle(e.target, null).getPropertyValue('background-color');
    switch (activeMode) {
        case 'black':
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            break;
        case 'colors':
            e.target.style.backgroundColor = randomColor();
            break;
        case 'shading':
            e.target.style.backgroundColor = shading(crntClr);
            break;
    }
};

const active = () => {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pxl) => {
        pxl.addEventListener('mouseover', handlePixelHover);
    });
};

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        handleButtonClick(button);
    });
});

drawGrid(gridSize);
active();
