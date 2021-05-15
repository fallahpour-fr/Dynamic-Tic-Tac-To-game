'use strict'

let gameSizeBtn = document.querySelector('.game-size__button');
// let gamSizeinput = document.getElementById('game-size-lable');
let table = document.querySelector('.table')
let mytab = document.querySelector('.mytab');
let size;
let currentPlayer = 'X';
let activePlayer = 0;
let arr;
let scoreX = document.querySelector('.player__score--X');
let scoreO = document.querySelector('.player__score--O');
let playerFirst = document.querySelector('.player--first');
let playerSecond = document.querySelector('.player--second');
let arrAddScore = [0, 0];
let resetBtn = document.querySelector('.reset-game__btn');
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let playerWinner = document.querySelector('.player--winner');
let gamSizeValue = document.querySelector('#game-size-lable');

function switchPlayer() {
    playerFirst.classList.toggle('player--active');
    playerSecond.classList.toggle('player--active');
}

gameSizeBtn.addEventListener('click', clickbtn, {
    once: true
});

function clickbtn() {
    let gamSizeinput = document.getElementById('game-size-lable').value;
    size = Number(gamSizeinput);
    arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = new Array(size);
    }
    changeGamesize(size, arr);
}


// gamSizeinput.addEventListener('keyup', enterClick);

// function enterClick(event) {
//     if (event.key === 'Enter') {
//         size = Number(gamSizeinput.value);
//         table.classList.add('hidden-table');
//         let arr = new Array(size);
//         for (var i = 0; i < size; i++) {
//             arr[i] = new Array(size);
//         }

//         changeGamesize(size, arr);
//     }

// }

function changeGamesize(size, arr) {

    for (let i = 0; i < size; i++) {

        let tag = document.createElement('tr');
        // tag.setAttribute('id', i + 4);
        for (let j = 0; j < size; j++) {
            let tdTag = document.createElement('td');
            tdTag.classList.add('defalt-td')
            // k++;
            tag.appendChild(tdTag);
            checktable(tdTag, arr ,i,j);
        }
        mytab.appendChild(tag);
        // k = 0;
    }
}

function checktable(tdTag, arr ,i,j) {

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
    console.log(arr, r, t);
    let matches = 0;
    let lastValue = arr[r][t];

    //horizontal
    for (let k = 0; k < arr.length; k++) {
        let currentValue = arr[r][k];
        if (currentValue === lastValue) {
            matches++;
            console.log(matches);
        } else {
            matches = 0;
        }
        if (matches === arr.length) {
            console.log('hi');
            addScore(lastValue);
            break;
        }

    }


    //vertical
    matches = 0;
    for (let h = 0; h < arr.length; h++) {
        let currentValue = arr[h][t];
        if (currentValue === lastValue) {
            matches++;
            console.log(matches);
        } else {
            matches == 0;
        }
        if (matches === arr.length) {
            console.log('ho');
            addScore(lastValue);
            break;
        }
    }


    matches = 0;
    //top left to bottom right
    for (let k = 0; k < arr.length; k++) {
        for (let n = 0; n < arr.length; n++) {
            if (k == n) {
                if (arr[n][k] === lastValue) {
                    matches++;
                    if (matches == arr.length) {
                        console.log('multiplie1 win');
                        addScore(lastValue);
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
                        console.log('multiplie2 win');
                        addScore(lastValue);
                    }
                } else {
                    matches = 0;
                }
            } else {
                continue;
            }
        }
    }


    // for (let row = 0; row < size; row++) {
    //     let winner;
    //     let init = arr[row][0];
    //     for (let col = 1; col < size; col++) {
    //         if (init !== arr[row][col]) {
    //             break;
    //         }
    //         if (col === size - 1) {
    //             winner = init;
    //         }
    //     }
    //     if (winner) {
    //         console.log('Pouya', winner)
    //     }
    // }

}

function addScore(lastValue) {
    let k=0;
    if (lastValue == 'X') {
        k++;
        arrAddScore[0] += k;
        scoreX.textContent = arrAddScore[0];
        k = 0;
        openModal(lastValue);
    } else {
        n++;
        arrAddScore[1] += n;
        scoreO.textContent = arrAddScore[1];
        n = 0;
        openModal(lastValue);
    }
    console.log(arrAddScore);
}


function openModal(lastValue) {
    modal.classList.remove('hidden-table');
    overlay.classList.remove('hidden-table');
    playerWinner.innerText = lastValue;
};

function closeModal() {
    modal.classList.add('hidden-table');
    overlay.classList.add('hidden-table');
};

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', keydownfunction);

function keydownfunction(e) {

    if (e.key === 'Escape') {
        console.log('hi');
        closeModal();
    }

}


/*...............................................reset....................................*/
resetBtn.addEventListener('click', resetFunction, {
    once: true
});

function resetFunction() {

    playerFirst.classList.add('player--active');
    playerSecond.classList.remove('player--active');
    gamSizeValue.value = '';
    arr;
    size;
    clickbtn();
    console.log(arr);
}