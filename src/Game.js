import React from 'react';
import PropTypes from 'prop-types';

import './Game.css';

const Game = ({ p1Name, p2Name, nextPlayer, board, onCellClicked, p1Wins, p2Wins }) => {
  return (
    <div id="game" data-hook="game-board">
      <span data-hook="p1-name" className={nextPlayer === p1Name ? 'selected' : ''}>
        {p1Name}
      </span>
      <span data-hook="p1-wins">{p1Wins}</span>
      :
      <span data-hook="p2-wins">{p2Wins}</span>
      <span data-hook="p2-name" className={nextPlayer === p2Name ? 'selected' : ''}>
        {p2Name}
      </span>
      <table role="grid">
        <tbody>
          {board.map((row, rIndex) => (
            <tr key={rIndex}>
              {row.map((cell, cIndex) => (
                <td
                  key={cIndex}
                  role="gridcell"
                  data-hook="cell"
                  onClick={() => onCellClicked(rIndex, cIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Game.propTypes = {
  p1Name: PropTypes.string.isRequired,
  p2Name: PropTypes.string.isRequired,
  nextPlayer: PropTypes.string.isRequired,
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onCellClicked: PropTypes.func.isRequired,
  p1Wins: PropTypes.number.isRequired,
  p2Wins: PropTypes.number.isRequired,
};
export default Game;
