// Create a grid of divs to represent the etch-a-sketch canvas

const grid = document.getElementById('grid');

function createGrid(size) {
    grid.innerHTML = '';
    const cellSize = 512 / size;
    grid.style.width = (cellSize * size) + 'px';
    grid.style.height = (cellSize * size) + 'px';
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = cellSize + 'px';
        cell.style.height = cellSize + 'px';
        cell.style.boxSizing = 'border-box';
        cell.addEventListener('mouseover', () => {
            if (isDrawing) cell.style.backgroundColor = '#000000';
        });
        grid.appendChild(cell);
    }
}

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

createGrid(16);

// Add event listeners to the cells to change their color on hover

let isDrawing = false;

document.addEventListener('mousedown', () => isDrawing = true);
document.addEventListener('mouseup', () => isDrawing = false);

