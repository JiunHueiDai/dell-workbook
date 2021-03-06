'use strict';

document.addEventListener("DOMContentLoaded", function (event) {
  var style = 'o';

  document.querySelectorAll('[data-cell]').forEach( cell =>
    cell.addEventListener('click', addObject)
  )

  document.querySelector('#clear').addEventListener("click", clear);

  function clear() {
    style = 'o';
    document.querySelectorAll('[data-cell]').forEach(function (cell) {
      cell.innerHTML = "";
    })
    document.querySelector('#announce-winner').innerHTML = "";
  }

  function getWinnerPositions() {
    return [
      { "pos1": "0", "pos2": "1", "pos3": "2" }
      , { "pos1": "3", "pos2": "4", "pos3": "5" }
      , { "pos1": "6", "pos2": "7", "pos3": "8" }
      , { "pos1": "0", "pos2": "3", "pos3": "6" }
      , { "pos1": "1", "pos2": "4", "pos3": "7" }
      , { "pos1": "2", "pos2": "5", "pos3": "8" }
      , { "pos1": "0", "pos2": "4", "pos3": "8" }
      , { "pos1": "2", "pos2": "4", "pos3": "6" }
    ];
  }

  function addObject() {
    if (!this.firstChild) {
      this.insertAdjacentHTML('afterbegin', style);
      var matchingCheckedCellNumbers = selectedCellNumbers(this).length;
      if (matchingCheckedCellNumbers > 2) {
        checkWinner(this);
      }
      style = (style === 'o') ? 'x' : 'o';
    }
  }

  function selectedCellNumbers(clickedCell) {
    return [].slice.call(document.querySelectorAll('[data-cell]')).filter(cell => {
      if(clickedCell.innerHTML === cell.innerHTML)
        return cell;
    }).map(cell => cell.getAttribute("data-cell"));
  }

  function checkWinner(clickedCell) {
    var filteredWinnerPositions = getAllWinnerPos(clickedCell);
    var matchingSelectedStyleCellNumbers = selectedCellNumbers(clickedCell);

    filteredWinnerPositions.some(winnerPosition => {
      if (matchingSelectedStyleCellNumbers.includes(winnerPosition.pos1) & matchingSelectedStyleCellNumbers.includes(winnerPosition.pos2) & matchingSelectedStyleCellNumbers.includes(winnerPosition.pos3)) {
        endGame(clickedCell);
        return true;
      }
    });
  }

  function getAllWinnerPos(clickedCell) {
    var clickedValue = clickedCell.getAttribute("data-cell");
    var filteredWinnerPositions = getWinnerPositions().filter(winnerPos => {
      return clickedValue === winnerPos.pos1 || clickedValue === winnerPos.pos2 || clickedValue === winnerPos.pos3;
    });

    return filteredWinnerPositions;
  }

  function endGame(clickedCell) {
    var announceWinner = document.querySelector("#announce-winner");
    if(announceWinner.innerHTML === "")
    {
      var capStyle = clickedCell.innerHTML.toUpperCase();
      announceWinner.insertAdjacentHTML('afterbegin', `<div style="font-size: 38px;color: red;margin: 8px;">Winner: "${capStyle}" User</div>`);  
    }
  }
});