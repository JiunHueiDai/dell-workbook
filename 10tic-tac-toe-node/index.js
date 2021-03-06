'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
  return board.some(row => verifyMatch(row));
}

function verifyMatch(row) {
  return (row[0] === row[1] && row[1] === row[2] && row[2] === row[0] && row[0] === playerTurn);
}

function verticalWin() {
  return ((board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] === board[2][0] && board[0][0] === playerTurn)
       || (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] === board[2][1] && board[0][1] === playerTurn)
       || (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] === board[2][2] && board[0][2] === playerTurn));
}

function diagonalWin() {
  return ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === board[2][2] && board[1][1] === playerTurn)
       || (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] === board[0][2] && board[1][1] === playerTurn));
}

function checkForWin() {
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    console.log("***Congrats", playerTurn, "User!!***");
    return true;
  }
  return false;
}

function ticTacToe(row, column) {
  if (!areValuesValid(row, column))
    return;

  if (board[row][column] === ' ') {
    board[row][column] = playerTurn;
    checkForWin();
    playerTurn = playerTurn === 'X' ? 'O' : 'X';
  }
}

function areValuesValid(row, column){
  if (row > 2 || row < 0){
    console.log("***Row has to be an integer value between 0-2***");
    return false;
  }

  if (column > 2 || column < 0){
    console.log("***Column has to be an integer value between 0-2***");
    return false;
  }

  return true;
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [[' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' ']]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' ']]);
    });
    it('should check for vertical wins', () => {
      board = [[' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' ']];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' ']];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X']];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}