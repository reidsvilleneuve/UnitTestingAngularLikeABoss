describe('my first test', function () {
  let myObj;

  beforeEach(function () {
    myObj = { val1: 5 };
  });

  it('should work', function () {
    myObj.val1 = 6;
    expect(myObj.val1).toEqual(6);
  });

  it('should work', function () {
    expect(myObj.val1).toEqual(5);
  })
});
