const { gameStatus, doesWinByVerticalLine, doesWinByHorizontalLine, doesWinByDiagonalLine } = require('./gameService');

describe('game service', () => {

  describe('doesWinByVerticalLine', () => {
    it('should be truth if board has selected vertical line filled with symbol', () => {
      const board = [
        ['X', '', ''],
        ['X', 'X', ''],
        ['X', '', 'X']
      ];

      expect(doesWinByVerticalLine('X', 0, board)).toBeTruthy();
    });

    it('should be falsy if board has not selected vertical line filled with symbol', () => {
      const board = [
        ['X', '', ''],
        ['X', 'X', ''],
        ['X', '', 'X']
      ];

      expect(doesWinByVerticalLine('X', 1, board)).toBeFalsy();
  });
});

describe('doesWinByHorizontalLine', () => {
  it('should be truth if board has selected horizontal line filled with symbol', () => {
    const board = [
      ['X', '', ''],
      ['X', 'X', 'X'],
      ['X', '', 'X']
    ];

    expect(doesWinByHorizontalLine('X', 1, board)).toBeTruthy();
  });

  it('should be falsy if board has not selected horizontal line filled with symbol', () => {
    const board = [
      ['X', '', ''],
      ['X', 'X', ''],
      ['X', '', 'X']
    ];

    expect(doesWinByHorizontalLine('X', 1, board)).toBeFalsy();
});
});

describe('doesWinByDiagonalLine', () => {
  it('should be truth if board has diagonal filled with symbol', () => {
    const board = [
      ['X', '', ''],
      ['X', 'X', ''],
      ['X', '', 'X']
    ];

    expect(doesWinByDiagonalLine('X', board)).toBeTruthy();
  });

  it('should be falsy if board has no diagonal filled with symbol', () => {
    const board = [
      ['X', '', ''],
      ['X', 'X', ''],
      ['X', '', '']
    ];

    expect(doesWinByDiagonalLine('X', board)).toBeFalsy();
});
});

  describe('game status', () => {
    it('should handle horizontal line', () => {
      const board = [['X', 'X', 'X'], ['', '', ''], ['', '', '']];
      expect(gameStatus(board)).toBe('X');
    });

    it('should handle diagonal line', () => {
      const board = [
        ['X', '', ''],
        ['', 'X', ''],
        ['', '', 'X']
      ];

      expect(gameStatus(board)).toBe('X');
    });

    it('should handle vertical line', () => {
      const board = [
        ['', '', 'X'],
        ['', '', 'X'],
        ['', '', 'X']
      ];

      expect(gameStatus(board)).toBe('X');
    });
  });
});
