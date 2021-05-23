'use strict'

const gameSizeBtn = document.querySelector('.game-size__button');
const mytab = document.querySelector('.mytab');
const scoreX = document.querySelector('.player__score--X');
const scoreO = document.querySelector('.player__score--O');
const playerFirst = document.querySelector('.player--first');
const playerSecond = document.querySelector('.player--second');
const resetBtn = document.querySelector('.reset-game__btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const playerWinner = document.querySelector('.player--winner');
const gamSizeinput = document.getElementById('game-size-lable');
let size;
let currentPlayer = 'X';
let activePlayer = 0;
let arr;
let arrAddScore = [0, 0];


resetBtn.addEventListener('click', resetGame);
gameSizeBtn.addEventListener('click', getGameSizeBtn);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', keydown);

/* ..........................................switchPlayer............................... */

function switchPlayer() {
    playerFirst.classList.toggle('player--active');
    playerSecond.classList.toggle('player--active');
}

/*...............................................reset....................................*/

function resetGame() {
    let trtag = document.querySelectorAll('.trtag');
    playerFirst.classList.add('player--active');
    playerSecond.classList.remove('player--active');
    gamSizeinput.value = '';
    activePlayer = 0;
    trtag.forEach((iteme) => {
        iteme.classList.add('hidden-table')
    })
   
    size = Number(document.getElementById('game-size-lable').value);
    arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = new Array(size);
    }
    changeGameSize(size, arr);
}

/*...................................gameStart......................................... */

function getGameSizeBtn() {
    size = Number(document.getElementById('game-size-lable').value);
    arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = new Array(size);
    }
    changeGameSize(size, arr);
}


function changeGameSize(size, arr) {

    for (let i = 0; i < size; i++) {
        let tag = document.createElement('tr');
        tag.setAttribute('class', 'trtag');
        for (let j = 0; j < size; j++) {
            let tdTag = document.createElement('td');
            tdTag.classList.add('defalt-td')
            tag.appendChild(tdTag);
            checkPlayerTurn(tdTag, arr, i, j);
        }
        mytab.appendChild(tag);
    }
}

function checkPlayerTurn(tdTag, arr, i, j) {

    tdTag.addEventListener('click', function () {

        if (activePlayer == 0) {
            arr[i][j] = 'X';
            tdTag.innerHTML = 'X';
            activePlayer = 1;
            currentPlayer = 'X';
        } else {
            arr[i][j] = 'O';
            activePlayer = 0;
            tdTag.innerHTML = 'O';
            currentPlayer = 'O';
        }
        switchPlayer();
        checkWinner(arr, i, j);
    }, {
        once: true
    })

}

function checkWinner(arr, r, t) {
    let matches = 0;
    let lastValue = arr[r][t];

    //horizontal
    for (let k = 0; k < arr.length; k++) {
        let currentValue = arr[r][k];
        if (currentValue === lastValue) {
            matches++;
        } else {
            matches = 0;
        }
        if (matches === arr.length) {
            addWinningPoint(lastValue);
            break;
        }

    }


    //vertical
    matches = 0;
    for (let h = 0; h < arr.length; h++) {
        let currentValue = arr[h][t];
        if (currentValue === lastValue) {
            matches++;
        } else {
            matches == 0;
        }
        if (matches === arr.length) {
            addWinningPoint(lastValue);
            break;
        }
    }

    //top left to bottom right matches
    matches = 0;
    for (let k = 0; k < arr.length; k++) {
        for (let n = 0; n < arr.length; n++) {
            if (k == n) {
                if (arr[n][k] === lastValue) {
                    matches++;
                    if (matches == arr.length) {
                        addWinningPoint(lastValue);
                    }
                } else {
                    matches = 0;
                }
            } else {
                continue;
            }
        }
    }

    matches = 0;
    //top right to bottom left matches
    for (let k = 0; k < arr.length; k++) {
        for (let n = arr.length - 1; 0 <= n; n--) {
            if ((n + k) == arr.length - 1) {
                if (arr[k][n] === lastValue) {
                    matches++;
                    if (matches == arr.length) {
                        addWinningPoint(lastValue);
                    }
                } else {
                    matches = 0;
                }
            } else {
                continue;
            }
        }
    }

}

function addWinningPoint(lastValue) {
    let k = 0;
    if (lastValue == 'X') {
        k++;
        arrAddScore[0] += k;
        scoreX.textContent = arrAddScore[0];
        k = 0;
        openModalAndResetGame(lastValue);
    } else {
        let n = 0;
        n++;
        arrAddScore[1] += n;
        scoreO.textContent = arrAddScore[1];
        n = 0;
        openModalAndResetGame(lastValue);
    }
}


function openModalAndResetGame(lastValue) {
    modal.classList.remove('hidden-table');
    overlay.classList.remove('hidden-table');
    playerWinner.innerText = lastValue;
    resetGame();
};

function closeModal() {
    modal.classList.add('hidden-table');
    overlay.classList.add('hidden-table');
};

function keydown(e) {

    if (e.key === 'Escape') {
        closeModal();
    }

}