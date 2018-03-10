import { mount } from 'enzyme';

const appDriver = () => {
  let wrapper;
  return {
    render: node => {
      wrapper = mount(node, { attachTo: document.createElement('div') });
      return wrapper;
    },
    newGame: (p1Name, p2Name) => {
      wrapper.find('[data-hook="p1-input"]').simulate('change', { target: { value: p1Name } });
      wrapper.find('[data-hook="p2-input"]').simulate('change', { target: { value: p2Name } });
      wrapper.find('[data-hook="new-game"]').simulate('click');
    },
    nextGame: () => wrapper.find('[data-hook="new-game"]').simulate('click'),
    clickACellAt: index =>
      wrapper
        .find('[data-hook="cell"]')
        .at(index)
        .simulate('click'),
    getACellAt: index =>
      wrapper
        .find('[data-hook="cell"]')
        .at(index)
        .text(),
    isBoardEmpty: () => wrapper.find('[data-hook="cell"]').reduce((empty = true, cell) => empty && cell.text() === ''),
    isPlayer1Selected: () => wrapper.find('[data-hook="p1-name"]').hasClass('selected'),
    isPlayer2Selected: () => wrapper.find('[data-hook="p2-name"]').hasClass('selected'),
    getPlayer1Wins: () => wrapper.find('[data-hook="p1-wins"]').text(),
    getPlayer2Wins: () => wrapper.find('[data-hook="p2-wins"]').text(),
    getWinnerMessage: () => wrapper.find('[data-hook="winner-message"]').text(),
    isRegistrationVisible: () => wrapper.find('[data-hook="registration"]').length === 1,
    isGameBoardVisible: () => wrapper.find('[data-hook="game-board"]').length === 1,
    isNewGameButtonVisible: () => wrapper.find('[data-hook="new-game"]').exists(),
  };
};

export default appDriver;
