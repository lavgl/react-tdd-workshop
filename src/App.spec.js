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
  expect(driver.isPlayer1Selected()).toBe(true);
});

test('second player should be selected after first one clicked', () => {
  driver.newGame(p1Name, p2Name);
  driver.clickACellAt(4);
  expect(driver.isPlayer2Selected()).toBe(true);
});

test('only player can be selected', () => {
  driver.newGame(p1Name, p2Name);
  expect(driver.isPlayer1Selected()).toBe(true);
  expect(driver.isPlayer2Selected()).toBe(false);
  driver.clickACellAt(4);
  expect(driver.isPlayer1Selected()).toBe(false);
  expect(driver.isPlayer2Selected()).toBe(true);
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