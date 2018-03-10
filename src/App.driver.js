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
    isPlayer1Selected: () => wrapper.find('[data-hook="p1-name"]').hasClass('selected'),
    isPlayer2Selected: () => wrapper.find('[data-hook="p2-name"]').hasClass('selected'),
    getWinnerMessage: () => wrapper.find('[data-hook="winner-message"]').text(),
    isRegistrationVisible: () => wrapper.find('[data-hook="registration"]').length === 1,
    isGameBoardVisible: () => wrapper.find('[data-hook="game-board"]').length === 1,
  };
};

export default appDriver;
