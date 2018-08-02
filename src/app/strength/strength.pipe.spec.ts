import { StrengthPipe } from './strength.pipe';

describe('Strength pipe', () => {
  let pipe;

  beforeEach(function() {
    pipe = new StrengthPipe();
  });

  describe('when strength is under 10', function() {
    [-1, 0, 5, 9].forEach(testNumber => {
      const expectedMessage = `${testNumber} (weak)`;

      it(`should say "${expectedMessage}" when strenth is ${testNumber}`, () => {
        expect(pipe.transform(testNumber)).toEqual(expectedMessage);
      });
    });
  });

  describe('when strength is between 10 and 19', function() {
    [10, 14, 19].forEach(testNumber => {
      const expectedMessage = `${testNumber} (strong)`;

      it(`should say "${expectedMessage}" when strenth is ${testNumber}`, () => {
        expect(pipe.transform(testNumber)).toEqual(expectedMessage);
      });
    });
  });

  describe('when strength is 20 or over', function() {
    [20, 100, 10000].forEach(testNumber => {
      const expectedMessage = `${testNumber} (unbelievable)`;

      it(`should say "${expectedMessage}" when strenth is ${testNumber}`, () => {
        expect(pipe.transform(testNumber)).toEqual(
          `${testNumber} (unbelievable)`
        );
      });
    });
  });
});
