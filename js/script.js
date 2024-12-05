const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverText = document.querySelector('.game-over');
const scoreDisplay = document.getElementById('score');

let score = 1;
let loop;
let gameEnded = false; 

const jump = () => {
    if (!gameEnded) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

const startGame = () => {
    score = 0;
    scoreDisplay.textContent = score;
    gameEnded = false;
    

    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = '';
    mario.style.animation = '';
    mario.src = './images/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    gameOverText.classList.remove('visivel');

    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = './images/game-over-mario.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';
            gameOverText.classList.add('visivel');

            gameEnded = true;
            clearInterval(loop);
        } else if (!gameEnded) {
            score++;
            scoreDisplay.textContent = score;
        }
    }, 10);
};

document.addEventListener('keydown', (event) => {
    if (gameEnded) {
        startGame();
    } else {
        jump();
    }
});
startGame();
