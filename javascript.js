'use strict'

let gameSizeBtn = document.querySelector('.game-size__button');
// let gamSizeinput = document.getElementById('game-size-lable');
let table = document.querySelector('.table')
let mytab = document.querySelector('.mytab');
let size;
let k = 0;
let n = 0;
let currentPlayer = 'X';
let activePlayer = 0;
let matches = 0;
let scoreX = document.querySelector('.player__score--X');
let scoreO = document.querySelector('.player__score--O');
let playerFirst = document.querySelector('.player--first');
let playerSecond = document.querySelector('.player--second');
let arrAddScore = [0, 0];
let resetBtn = document.querySelector('.reset-game__btn');

function switchPlayer() {
    playerFirst.classList.toggle('player--active');
    playerSecond.classList.toggle('player--active');
}

gameSizeBtn.addEventListener('click', clickbtn );

function clickbtn() {
    let gamSizeinput = document.getElementById('game-size-lable').value;
    size=Number(gamSizeinput);
    table.classList.add('hidden-table');
    let arr = new Array(size);
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
    // console.log('hi' , size);
    for (let i = 0; i < size; i++) {
        let tag = document.createElement('tr');
        // tag.setAttribute('id', i + 4);
        for (let j = 0; j < size; j++) {
            let tdTag = document.createElement('td');
            tdTag.setAttribute('id', `${i}${j}`);
            // tdTag.style = 'border:10px solid black';
            tdTag.classList.add('defalt-td')
            // k++;
            tag.appendChild(tdTag);
            checktable(tdTag, arr, size);
        }
        mytab.appendChild(tag);
        // k = 0;
    }
    // console.log(arr);
}

function checktable(tdTag, arr, size) {

    tdTag.addEventListener('click', function () {
        let id = tdTag.id;
        let idNumber = id.split("")
        console.log(Number(idNumber[0]), Number(idNumber[1]));

        if (activePlayer == 0) {
            arr[Number(idNumber[0])][Number(idNumber[1])] = 'X';
            tdTag.innerHTML = 'X'
            activePlayer = 1;
            currentPlayer = 'X';
        } else {
            arr[Number(idNumber[0])][Number(idNumber[1])] = 'O';
            activePlayer = 0;
            tdTag.innerHTML = 'O';
            currentPlayer = 'O';
        }
        switchPlayer();
        checkWinner(arr, tdTag, size);
    })

}

function checkWinner(arr, tdTag, size) {
    console.log(tdTag.innerHTML, size);
    console.log(arr);
    //horizontal
    for (let k = 0; k < size; k++) {

        for (let n = 0; n < size; n++) {
            if (arr[k][n] === tdTag.innerHTML) {
                matches++;
                if (matches == size) {
                    console.log('horizontal win');
                    addScore(tdTag.innerHTML);
                }
            } else {
                matches = 0;
            }
        }
    }

    //vertical
    for (let k = 0; k < size; k++) {

        for (let n = 0; n < size; n++) {
            if (arr[n][k] === tdTag.innerHTML) {
                matches++;
                if (matches == size) {
                    console.log('vertical win');
                    addScore(tdTag.innerHTML);
                }
            } else {
                matches = 0;
            }
        }
    }

    //top left to bottom right
    for (let k = 0; k < size; k++) {
        for (let n = 0; n < size; n++) {
            if (k == n) {
                if (arr[n][k] === tdTag.innerHTML) {
                    matches++;
                    if (matches == size) {
                        console.log('multiplie1 win');
                        addScore(tdTag.innerHTML);
                    }
                } else {
                    matches = 0;
                }
            } else {
                continue;
            }
        }
    }

    //top right to bottom left matches
    for (let k = 0; k < size; k++) {
        for (let n = size - 1; 0 <= n; n--) {
            if ((n + k) == size - 1) {
                if (arr[k][n] === tdTag.innerHTML) {
                    matches++;
                    if (matches == size) {
                        console.log('multiplie2 win')
                        addScore(tdTag.innerHTML);
                    }
                } else {
                    matches = 0;
                }
            } else {
                continue;
            }
        }
    }

    // resetFunction(tdTag, arr);
}


function addScore(currentPlayer) {
    if (currentPlayer == 'X') {
        k++;
        arrAddScore[0] += k;
        scoreX.textContent = arrAddScore[0];
        k = 0;
    } else {
        n++;
        arrAddScore[1] += n;
        scoreO.textContent = arrAddScore[1];
        n = 0;

    }
    console.log(arrAddScore);
}

resetBtn.addEventListener('click', resetFunction);

function resetFunction() {
    clickbtn();
    changeGamesize();
    if(activePlayer==1){
        activePlayer=0
    }
    playerFirst.classList.add('player--active');
    playerSecond.classList.remove('player--active');

}