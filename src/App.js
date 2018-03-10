import React from 'react';
import Registration from './Registration';
import Game from './Game';
import { gameStatus } from './gameService';
import './App.css';

const haveNewGameBeenStarted = (p1Name, p2Name) => {
  return p1Name && p1Name !== '' && p2Name && p2Name !== '';
};

const EmptyBoard = [['', '', ''], ['', '', ''], ['', '', '']];
const FirstPlayer = 'X';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      p1Wins: 0,
      p2Wins: 0,
      p1Name: '',
      p2Name: '',
      board: EmptyBoard,
      winner: '',
      currentPlayer: FirstPlayer,
    };
  }

  onNewGame = ({ p1Name, p2Name }) => {
    this.setState({ p1Name, p2Name, board: EmptyBoard, currentPlayer: FirstPlayer, winner: '' });
  };

  handleCellClick = (rIndex, cIndex) => {
    if (this.state.winner) {
      return;
    }
    if (this.state.board[rIndex][cIndex]) {
      return;
    }
    const board = this.state.board.map(row => [...row]);
    board[rIndex][cIndex] = this.state.currentPlayer;
    const status = gameStatus(board);
    switch (status) {
      case 'X':
        this.setState({ p1Wins: this.state.p1Wins + 1 });
        break;
      case 'O':
        this.setState({ p2Wins: this.state.p2Wins + 1 });
        break;
      default:
    }
    if (status) {
      this.setState({ winner: status });
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({ board, currentPlayer: nextPlayer });
  };

  saveState = () => {
    localStorage.setItem('game', JSON.stringify(this.state));
  };

  loadState = () => {
    const gameState = localStorage.getItem('game');
    this.setState(JSON.parse(gameState));
  };

  renderGameOver = () => {
    if (!this.state.winner) {
      return;
    }
    let message;
    switch (this.state.winner) {
      case '-':
        message = "It's a tie!";
        break;
      case 'X':
        message = `${this.state.p1Name} won!`;
        break;
      case 'O':
        message = `${this.state.p2Name} won!`;
        break;
      default:
        return;
    }
    return (
      <div>
        <div data-hook="winner-message">{message}</div>
        <button
          onClick={() => this.onNewGame({ p1Name: this.state.p1Name, p2Name: this.state.p2Name })}
          data-hook="new-game"
        >
          New Game
        </button>
      </div>
    );
  };

  render() {
    const { board, p1Name, p2Name, currentPlayer, p1Wins, p2Wins } = this.state;
    return (
      <div className="App">
        {!haveNewGameBeenStarted(p1Name, p2Name) ? (
          <Registration onNewGame={this.onNewGame} />
        ) : null}
        <div>
          <button data-hook="save-state" onClick={() => this.saveState()}>
            Save state
          </button>
          <button data-hook="load-state" onClick={() => this.loadState()}>
            Load state
          </button>
        </div>
        {haveNewGameBeenStarted(p1Name, p2Name) ? (
          <Game
            onCellClicked={this.handleCellClick}
            board={board}
            p1Name={p1Name}
            p2Name={p2Name}
            p1Wins={p1Wins}
            p2Wins={p2Wins}
            nextPlayer={currentPlayer === 'X' ? p1Name : p2Name}
          />
        ) : null}
        {this.renderGameOver()}
      </div>
    );
  }
}
export default App;
