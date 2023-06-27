const canvas = document.querySelector('#gameBoard');
const scoreField = document.querySelector('#scoreField');
const leftButton = document.querySelector('#leftButton');
const rightButton = document.querySelector('#rightButton');
const upButton = document.querySelector('#upButton');
const downButton = document.querySelector('#downButton');
let ctx = canvas.getContext('2d');

const boardWidth = canvas.width;
const boardHeight = canvas.height;
const pixel = 30;
let score = 0;
let foodX;
let foodY;
DirectionX = pixel;
DirectionY = 0;

let snake = [
    { x: 4 * pixel, y: 0 },
    { x: 3 * pixel, y: 0 },
    { x: 2 * pixel, y: 0 },
    { x: 1 * pixel, y: 0 },
    { x: 0, y: 0 },

];

startGame();
spawnFood();

window.addEventListener('keydown', (event) => {
    changeDirection(event);
});

downButton.addEventListener('click', () => {
    changeDirectionOnButton('down');
})

upButton.addEventListener('click', () => {
    changeDirectionOnButton('up');
})

leftButton.addEventListener('click', () => {
    changeDirectionOnButton('left');
})

rightButton.addEventListener('click', () => {
    changeDirectionOnButton('right');
})

function spawnFood() {
    foodX = Math.floor((Math.random() * (boardHeight - 0)) / pixel) * pixel;
    foodY = Math.floor((Math.random() * (boardHeight - 0)) / pixel) * pixel;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(foodX + (pixel / 2), foodY + (pixel / 2), pixel / 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
}

function startGame() {
    setInterval(() => {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
    }, 100);
}

function moveSnake() {
    const head = {
        x: snake[0].x + DirectionX,
        y: snake[0].y + DirectionY
    };
    if (head.x === foodX && head.y === foodY) {
        const newHead = {
            x: head.x + DirectionX,
            y: head.y + DirectionY
        };
        snake.unshift(newHead, head);
        spawnFood();
        score++;
        scoreField.textContent = 'Score: ' + score;
    } else {
        snake.unshift(head);
    }
    snake.pop();
}


function changeDirection(event) {
    let moveUp = DirectionX === 0 && DirectionY === -pixel;
    let moveDown = DirectionX === 0 && DirectionY === pixel;
    let moveLeft = DirectionX === -pixel && DirectionY === 0;
    let moveRight = DirectionX === pixel && DirectionY === 0;
    if (event.key.toLowerCase() === 's' && !moveUp) {
        DirectionX = 0;
        DirectionY = pixel;
    } else
    if (event.key.toLowerCase() === 'w' && !moveDown) {
        DirectionX = 0;
        DirectionY = -pixel;
    } else if (event.key.toLowerCase() === 'a' && !moveRight) {
        DirectionX = -pixel;
        DirectionY = 0;
    } else if (event.key.toLowerCase() === 'd' && !moveLeft) {
        DirectionX = pixel;
        DirectionY = 0;
    }
}

function changeDirectionOnButton(move) {
    let moveUp = DirectionX === 0 && DirectionY === -pixel;
    let moveDown = DirectionX === 0 && DirectionY === pixel;
    let moveLeft = DirectionX === -pixel && DirectionY === 0;
    let moveRight = DirectionX === pixel && DirectionY === 0;
    if (move === 'down' && !moveUp) {
        DirectionX = 0;
        DirectionY = pixel;
    } else
    if (move === 'up' && !moveDown) {
        DirectionX = 0;
        DirectionY = -pixel;
    } else if (move === 'left' && !moveRight) {
        DirectionX = -pixel;
        DirectionY = 0;
    } else if (move === 'right' && !moveLeft) {
        DirectionX = pixel;
        DirectionY = 0;
    }
}

function drawSnake() {
    snake.forEach((part) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(part.x, part.y, pixel, pixel);
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, pixel - 1, pixel - 1);
    });
}

function clearBoard() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, boardHeight, boardWidth);
}

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}