// Create a grid of divs to represent the etch-a-sketch canvas
const grid = document.getElementById('grid');
let isDrawing = false;
let isColorMode = false;
let isBrightMode = false;
let isBlackMode = false;
let isEraseMode = false;

function createGrid(size) {
    grid.innerHTML = '';
    const cellSize = 512 / size;
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = cellSize + 'px';
        cell.style.height = cellSize + 'px';
        cell.style.boxSizing = 'border-box';
        cell.dataset.count = 0;
        // Add event listener to each cell to change color on hover
        cell.addEventListener('mouseover', () => {
            if (isDrawing) {
                if (isEraseMode) {
                    cell.style.backgroundColor = '';
                    cell.dataset.count = 0;
                    delete cell.dataset.r;
                    delete cell.dataset.g;
                    delete cell.dataset.b;
                } else if (isBlackMode) {
                    cell.style.backgroundColor = '#000000';
                } else if (isBrightMode) {
                    if (isColorMode) {
                        const r = Math.floor(Math.random() * 256);
                        const g = Math.floor(Math.random() * 256);
                        const b = Math.floor(Math.random() * 256);
                        cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    } else {
                        cell.style.backgroundColor = '#ffffff';
                    }
                } else if (isColorMode) {
                    if (cell.dataset.count < 10) {
                        cell.dataset.count++;
                        if (!cell.dataset.r) {
                            cell.dataset.r = Math.floor(Math.random() * 256);
                            cell.dataset.g = Math.floor(Math.random() * 256);
                            cell.dataset.b = Math.floor(Math.random() * 256);
                        }
                        const factor = 1 - (cell.dataset.count / 10);
                        const r = Math.floor(cell.dataset.r * factor);
                        const g = Math.floor(cell.dataset.g * factor);
                        const b = Math.floor(cell.dataset.b * factor);
                        cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    }
                } else {
                    if (cell.dataset.count < 10) {
                        cell.dataset.count++;
                        const value = 255 - Math.floor(cell.dataset.count * 25.5);
                        cell.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;
                    }
                }
            }
        });
        grid.appendChild(cell);
    }
}

// Mouse down and up event listeners to track drawing state
document.addEventListener('mousedown', () => isDrawing = true);
document.addEventListener('mouseup', () => isDrawing = false);

// Prevent buttons from triggering drawing
document.getElementById('newGrid').addEventListener('mousedown', (e) => e.stopPropagation());
document.getElementById('colorMode').addEventListener('mousedown', (e) => e.stopPropagation());
document.addEventListener('dragstart', (e) => e.preventDefault());
document.getElementById('brightMode').addEventListener('mousedown', (e) => e.stopPropagation());
document.getElementById('blackMode').addEventListener('mousedown', (e) => e.stopPropagation());
document.getElementById('eraseMode').addEventListener('mousedown', (e) => e.stopPropagation());

// New grid button
document.getElementById('newGrid').addEventListener('click', () => {
    let size = parseInt(prompt('How many squares per side? (max 100)'));
    if (isNaN(size) || size < 1) {
        alert('Please enter a valid number!');
    } else if (size > 100) {
        alert('Maximum is 100!');
    } else {
        createGrid(size);
    }
});

// Side bar buttons

// Helper function to toggle button appearance
function toggleBtn(btn, state) {
    if (state) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

// Color Mode button
document.getElementById('colorMode').addEventListener('click', () => {
    isColorMode = !isColorMode;
    const btn = document.getElementById('colorMode');
    btn.innerHTML = isColorMode ? 'Color<br>Mode<br>ON' : 'Color<br>Mode<br>OFF';
    toggleBtn(btn, isColorMode);
});

// Bright Mode button
document.getElementById('brightMode').addEventListener('click', () => {
    isBrightMode = !isBrightMode;
    if (isBrightMode) isBlackMode = false;
    const btn = document.getElementById('brightMode');
    btn.innerHTML = isBrightMode ? 'Bright<br>Mode<br>ON' : 'Bright<br>Mode<br>OFF';
    toggleBtn(btn, isBrightMode);
    toggleBtn(document.getElementById('blackMode'), false);
    document.getElementById('blackMode').innerHTML = 'Black<br>Mode<br>OFF';
});

// Black Mode button
document.getElementById('blackMode').addEventListener('click', () => {
    isBlackMode = !isBlackMode;
    if (isBlackMode) isBrightMode = false;
    const btn = document.getElementById('blackMode');
    btn.innerHTML = isBlackMode ? 'Black<br>Mode<br>ON' : 'Black<br>Mode<br>OFF';
    toggleBtn(btn, isBlackMode);
    toggleBtn(document.getElementById('brightMode'), false);
    document.getElementById('brightMode').innerHTML = 'Bright<br>Mode<br>OFF';
});

// Erase Mode button
document.getElementById('eraseMode').addEventListener('click', () => {
    isEraseMode = !isEraseMode;
    const btn = document.getElementById('eraseMode');
    btn.innerHTML = isEraseMode ? 'Erase<br>ON' : 'Erase<br>OFF';
    toggleBtn(btn, isEraseMode);
});

createGrid(16);