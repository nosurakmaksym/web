

const ROW = 15;
const COL = 20;
const MINE_COUNT = ROW * COL * 0.09;
const MINE = -1;

let cellsOpen;
let place = [];

const numberColor = [
    '#0277BD', '#388E3C', '#D32F2F', '#fab608', '#7B1FA2', '#C2185B', '#0097A7', '#512DA8'
];
const mineCellColor = '#ee3936';
const openCellColor = {r: 194, g: 202, b: 169};
const closeCellColor = {r: 114, g: 218, b: 118};

let isGameOver;
let flagCount;

let board = document.querySelector('.board');
let flagCountNumber = document.querySelector('.flag-count');

board.style.display = 'grid';
board.style.gridTemplateColumns = `repeat(${COL}, 1fr)`;
board.style.gridTemplateRows = `repeat(${ROW}, 1fr)`;




function startGame()
{
    place = [];
    cellsOpen = 0;
    isGameOver = false;
    flagCount = MINE_COUNT;
    board.innerHTML = '';
    flagCountNumber.textContent = flagCount;

    createBoard();
    fillingPlace();

}


function v(i)
{
    if(i % 2 ==0)
        return 0.85;
    else return 1;

}


function createBoard(){

    for (let i = 0; i < ROW; i++) {
        const currentRow = [];
        for (let j = 0; j < COL; j++) {
            let cellElement = document.createElement('div');
            cellElement.classList.add('cell')
            cellElement.style.backgroundColor = `rgb(${closeCellColor.r * v(i+j)}, ${closeCellColor.g * v(i+j) }, ${closeCellColor.b * v(i+j)})`;
            currentRow.push({
                cell: cellElement,
                row: i,
                coll: j,
                number: 0,
                isOpen: false,
                isFlag: false 
            });

            cellElement.addEventListener('click', () => {
               leftClick(i, j)
            });

            cellElement.addEventListener('contextmenu', (event) => {
                rightClick(event, i, j);
            }); 

            board.appendChild(cellElement);
        }

        place.push(currentRow);

    }

}


function rightClick(event, i, j)
{
    event.preventDefault();
    if(isGameOver || place[i][j].isOpen)
        return;

    if(!place[i][j].isFlag && flagCount == 0)
        return;
    
    place[i][j].isFlag = !place[i][j].isFlag;

    if(place[i][j].isFlag){
        place[i][j].cell.textContent = ' 🚩';
        place[i][j].cell.style.color = numberColor[2];
        flagCount--;
    }else{ 
        place[i][j].cell.textContent = ' ';
        flagCount++;
    }

    flagCountNumber.textContent = flagCount;

}


function openAllMines()
{
    for(let i = 0; i < ROW; i++)
        for(let j = 0; j < COL; j++)
            if(place[i][j].number == MINE)
                place[i][j].cell.style.backgroundColor = mineCellColor;

}

function checkGameEnd(i, j)
{
    if(place[i][j].number == MINE){

        isGameOver = true;
        
        openAllMines();

        setTimeout(() => {
            alert('БУМ, БУМ, БАКАДА');
        }, 100);

        
        return;
    }

    let totalSafeCells = (ROW * COL) - MINE_COUNT;
    
    if (cellsOpen === totalSafeCells && !isGameOver) {
        isGameOver = true;
        setTimeout(() => {
            alert('НА ЦЕЙ РАЗ МІНИ ОБІЙШЛИ ВАС СТОРОНОЮ');
        }, 100);
    }

}

function leftClick(i, j)
{
    if(isGameOver || place[i][j].isFlag || place[i][j].isOpen)
        return;
    
    openCell(i, j);
    checkGameEnd(i, j);
    
}

function fillingPlace()
{
    let mineCount = 0;
    while(mineCount < MINE_COUNT){
        let i = Math.floor(Math.random() * ROW);
        let j = Math.floor(Math.random() * COL);

        if(place[i][j].number == MINE){
            continue;
        }
        place[i][j].number = MINE;
        mineCount++;
        //place[i][j].cell.style.backgroundColor = '#7c0000';

        for(let m_i = i-1; m_i < i-1 + 3; m_i++){
            for(let m_j = j-1; m_j < j-1 + 3; m_j++){
                if(m_i < ROW && m_i >= 0 && m_j < COL && m_j >= 0 && place[m_i][m_j].number != MINE)
                    place[m_i][m_j].number++;
            }

        }
    }

}





// for(let i = 0; i < r; i++){
//     for(let j = 0; j < c; j++){
//         place[i][j].cell.textContent = place[i][j].number;

//     }
// }


function openCell(i, j)
{
    if(i < 0 || i >= ROW || j < 0 || j >= COL)
        return;
    if(place[i][j].isOpen || place[i][j].isFlag)
        return;

    place[i][j].isOpen = true;
    place[i][j].cell.style.backgroundColor = `rgb(${openCellColor.r * v(i+j)}, ${openCellColor.g * v(i+j)}, ${openCellColor.b * v(i+j)})`;
    cellsOpen++;

    if(place[i][j].number == MINE){
        place[i][j].cell.style.backgroundColor = mineCellColor;
        return;
    }

    if(place[i][j].number > 0){
        place[i][j].cell.textContent = place[i][j].number;
        place[i][j].cell.style.color = numberColor[place[i][j].number - 1];
    } else {

        openCell(i+1, j);
        openCell(i-1, j);

        openCell(i, j+1);
        openCell(i, j-1);

        openCell(i+1, j+1);
        openCell(i-1, j-1);
        openCell(i+1, j-1);
        openCell(i-1, j+1);

    }
}



startGame();

document.getElementById('minesweeper-restart').addEventListener('click', () =>{
    startGame();
})
//openCell(4, 1);

//document.addEventListener()


// for(let i = 0; i < r; i++){
//     for(let j = 0; j < c; j++){
//         place[i][j].cell.textContent = i + ' ' + j;
//         place[i][j].cell.classList.add('cell');
//         con.append(place[i][j].cell);
//     }

// }



// let a = document.createElement('div');
// a.textContent = 'wwddwdd';
// a.classList.add('cell');
// con.prepend(a);


// let d = document.createElement('div');
// d.textContent = 'wwddwdd';
// d.classList.add('cell');
// con.prepend(d);