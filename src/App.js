import React from 'react';
import Registration from './Registration';
import Game from './Game';
import { gameStatus } from './gameService';
import './App.css';

const haveNewGameBeenStarted = (p1Name, p2Name) => {
  return p1Name && p1Name !== '' && p2Name && p2Name !== '';
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      p1Name: '',
      p2Name: '',
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: '',
      currentPlayer: 'X',
    };
  }

  onNewGame = ({ p1Name, p2Name }) => {
    this.setState({ p1Name, p2Name });
  };

  handleCellClick = (rIndex, cIndex) => {
    if (this.state.board[rIndex][cIndex]) {
      return;
    }
    const board = this.state.board.map(row => [...row]);
    board[rIndex][cIndex] = this.state.currentPlayer;
    const status = gameStatus(board);
    if (status) {
      this.setState({ winner: status });
    }
    const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.setState({ board, currentPlayer: nextPlayer });
  };

  renderMessage = () => {
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
    return <div data-hook="winner-message">{message}</div>;
  };

  render() {
    return (
      <div className="App">
        {!haveNewGameBeenStarted(this.state.p1Name, this.state.p2Name) ? (
          <Registration onNewGame={this.onNewGame} />
        ) : null}
        {haveNewGameBeenStarted(this.state.p1Name, this.state.p2Name) ? (
          <Game
            onCellClicked={this.handleCellClick}
            board={this.state.board}
            p1Name={this.state.p1Name}
            p2Name={this.state.p2Name}
          />
        ) : null}
        {this.renderMessage()}
      </div>
    );
  }
}
export default App;
