import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import appDriver from './App.driver';

configure({ adapter: new Adapter() });
let driver;
const p1Name = 'Yaniv';
const p2Name = 'Computer';

beforeEach(() => {
  driver = appDriver();
  driver.render(<App />);
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('should show "O" after second player clicks', () => {
  driver.newGame(p1Name, p2Name);
  driver.clickACellAt(0);
  driver.clickACellAt(1);
  expect(driver.getACellAt(1)).toBe('O');
});

test('"O" should win the game', () => {
  driver.newGame(p1Name, p2Name);
  driver.clickACellAt(4);
  driver.clickACellAt(0);
  driver.clickACellAt(5);
  driver.clickACellAt(1);
  driver.clickACellAt(7);
  driver.clickACellAt(2);
  expect(driver.getWinnerMessage()).toBe(`${p2Name} won!`);
});

test('user should not be able to press non-empty cell', () => {
  driver.newGame(p1Name, p2Name);
  driver.clickACellAt(4);
  driver.clickACellAt(4);
  expect(driver.getACellAt(4)).toBe('X');
});

test('message should be shown on tie game', () => {
  driver.newGame(p1Name, p2Name);
  driver.clickACellAt(4);
  driver.clickACellAt(7);
  driver.clickACellAt(2);
  driver.clickACellAt(6);
  driver.clickACellAt(8);
  driver.clickACellAt(0);
  driver.clickACellAt(3);
  driver.clickACellAt(5);
  driver.clickACellAt(1);
  expect(driver.getWinnerMessage()).toBe("It's a tie!");
});

test('first player selected on game start', () => {
  driver.newGame(p1Name, p2Name);
  expect(driver.isPlayer1Selected()).toBeTruthy();
});

test('second player should be selected after first one clicked', () => {
  driver.newGame(p1Name, p2Name);
  driver.clickACellAt(4);
  expect(driver.isPlayer2Selected()).toBeTruthy();
});

test('only player can be selected', () => {
  driver.newGame(p1Name, p2Name);
  expect(driver.isPlayer1Selected()).toBeTruthy();
  expect(driver.isPlayer2Selected()).toBeFalsy();
  driver.clickACellAt(4);
  expect(driver.isPlayer1Selected()).toBeFalsy();
  expect(driver.isPlayer2Selected()).toBeTruthy();
});

test('should hide registration after game starts', () => {
  expect(driver.isRegistrationVisible()).toBeTruthy();
  driver.newGame(p1Name, p2Name);
  expect(driver.isRegistrationVisible()).toBeFalsy();
});

it('should hide game board before game starts', () => {
  expect(driver.isGameBoardVisible()).toBeFalsy();
  driver.newGame(p1Name, p2Name);
  expect(driver.isGameBoardVisible()).toBeTruthy();
});

it('should show new game button on game end', () => {
  driver.newGame(p1Name, p2Name);
  expect(driver.isNewGameButtonVisible()).toBeFalsy();
  driver.clickACellAt(0);
  driver.clickACellAt(3);
  driver.clickACellAt(1);
  driver.clickACellAt(4);
  driver.clickACellAt(2);
  expect(driver.isNewGameButtonVisible()).toBeTruthy();
});

it('"New game" button should be hidden on new game stated', () => {
  driver.newGame(p1Name, p2Name);
  expect(driver.isPlayer1Selected()).toBeTruthy();
  driver.clickACellAt(0);
  driver.clickACellAt(3);
  driver.clickACellAt(1);
  driver.clickACellAt(4);
  driver.clickACellAt(2);
  driver.nextGame();
  expect(driver.isNewGameButtonVisible()).toBeFalsy();
});

it('player should be reset on on new game click after one ended', () => {
  driver.newGame(p1Name, p2Name);
  expect(driver.isPlayer1Selected()).toBeTruthy();
  driver.clickACellAt(0);
  driver.clickACellAt(3);
  driver.clickACellAt(1);
  driver.clickACellAt(4);
  driver.clickACellAt(2);
  driver.nextGame();
  expect(driver.isPlayer1Selected()).toBeTruthy();
});

it('board should be empty on new game click after one ended', () => {
  driver.newGame(p1Name, p2Name);
  expect(driver.isBoardEmpty()).toBeTruthy();
  driver.clickACellAt(0);
  driver.clickACellAt(3);
  driver.clickACellAt(1);
  driver.clickACellAt(4);
  driver.clickACellAt(2);
  expect(driver.isBoardEmpty()).toBeFalsy();
  driver.nextGame();
  expect(driver.isBoardEmpty()).toBeTruthy();
});

it('players should have zeros on first game start', () => {
  driver.newGame(p1Name, p2Name);
  expect(driver.getPlayer1Wins()).toBe('0');
  expect(driver.getPlayer2Wins()).toBe('0');
});

it('"X" should have 1 win after first game won', () => {
  driver.newGame(p1Name, p2Name);
  driver.clickACellAt(0);
  driver.clickACellAt(3);
  driver.clickACellAt(1);
  driver.clickACellAt(4);
  driver.clickACellAt(2);
  expect(driver.getPlayer1Wins()).toBe('1');
  expect(driver.getPlayer2Wins()).toBe('0');
});

it('"0" should have 1 win after first game won', () => {
  driver.newGame(p1Name, p2Name);
  driver.clickACellAt(4);
  driver.clickACellAt(0);
  driver.clickACellAt(5);
  driver.clickACellAt(1);
  driver.clickACellAt(7);
  driver.clickACellAt(2);
  expect(driver.getPlayer1Wins()).toBe('0');
  expect(driver.getPlayer2Wins()).toBe('1');
});

