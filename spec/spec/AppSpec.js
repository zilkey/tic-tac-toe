describe("Tic-Tac-Toe Board", function() {

  it("plays", function() {
    var othello = new Othello();
    expect(othello.board()).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(othello.turn).toEqual(2); // black
  });

});
