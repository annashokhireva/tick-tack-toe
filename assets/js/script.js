

const squares = Array.from(document.querySelectorAll('.square'));
const statusDisplay = document.querySelector('.status-display');
const resetBtn = document.querySelector('.reset-btn');

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let playField = document.querySelector('.play-field');
let currentPlayer = 'X';
let board;
let win;

function init(){

    board = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];
   
    render();   
    
    statusDisplay.textContent = '';
}    

init();

function render(){
    
    board.forEach(function(mark, index){
        squares[index].textContent = mark;
    });

    if ( win === 'T' ) {
        statusDisplay.textContent = `That's a tie!`;
      } 
    
      else if (win) { 
        statusDisplay.textContent = `${win} wins the game!`;
      } 
      
      else {
        statusDisplay.textContent = `It's ${currentPlayer}'s turn!`;
      }

}

function handlePlayerChange(e) {
    if (e.target.innerHTML){
        return;
    }
    
    let indx = squares.findIndex(function(square){
        return square === e.target;
    });

    board[indx] = currentPlayer;

    e.target.innerHTML = currentPlayer;
    
    currentPlayer = (currentPlayer === 'X' ? 'O' : 'X');
    
    win = getWinner();

    render();
}


playField.addEventListener('click', handlePlayerChange);

function getWinner() {
    let winner = null;

    winningCombos.forEach(function(combo, index){

        if (board[combo[0]] && board[combo[0]] === board[combo [1]] && 
            board[combo[0]] === board[combo[2]]) {
                winner = board[combo[0]];
            }   
    });

    if (winner) {
        return winner; 
      } 
      
    else if (board.includes('')) {
        return null;
    }
    else {
        return 'T';
      }

}

resetBtn.addEventListener('click', init);

