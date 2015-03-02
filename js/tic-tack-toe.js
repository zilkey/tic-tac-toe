var TickTackToe = function ($container) {
  this.$container = $container;
  this.turn = "O";
};

TickTackToe.prototype.nextTurn = function (e) {
  this.turn = this.turn === "O" ? "X" : "O";
};

TickTackToe.prototype.winningCombinations = function (e) {
  return [
    [this.grid[0][0], this.grid[0][1], this.grid[0][2]],
    [this.grid[1][0], this.grid[1][1], this.grid[1][2]],
    [this.grid[2][0], this.grid[2][1], this.grid[2][2]],
    [this.grid[0][0], this.grid[1][0], this.grid[2][0]],
    [this.grid[0][1], this.grid[1][1], this.grid[2][1]],
    [this.grid[0][2], this.grid[1][2], this.grid[2][2]],
    [this.grid[0][0], this.grid[1][1], this.grid[2][2]],
    [this.grid[0][2], this.grid[1][1], this.grid[2][0]],
  ];
};

TickTackToe.prototype.detectWinner = function (e) {
  this.winningCombinations().forEach(function (path) {
    if (!this.winner) {
      var oWon = path.every(function (item) { return item.html() === 'O'; });
      var xWon = path.every(function (item) { return item.html() === 'X'; });
      if (oWon) {
        this.winner = "O";
      }
      else if (xWon) {
        this.winner = "X";
      }

      if (this.winner) { this.declareWinner(path); }
    }
  }.bind(this));
};

TickTackToe.prototype.declareWinner = function (path) {
  this.$board.find('.cell').addClass('disabled');
  path.forEach(function (cell) {
    cell.removeClass('disabled').addClass("solved");
  });
};

TickTackToe.prototype.clicked = function (e) {
  var $cell = $(e.target);
  if ($cell.html().trim() == '' && !this.winner) {
    var point = $cell.data();
    $cell.html(this.turn);
    this.detectWinner();
    this.nextTurn();
  }
};

TickTackToe.prototype.draw = function () {
  var $row, $cell, row;
  this.grid = [];
  this.$board = $('<div class="board">');
  for (var y = 0; y < 3; y++) {
    row = [];
    $row = $('<div class="row">');
    for (var x = 0; x < 3; x++) {
      $cell = $('<div class="cell">').data({y: y, x: x});
      $cell.on('click', this.clicked.bind(this));
      $row.append($cell);
      row.push($cell);
    }
    this.grid.push(row);
    this.$board.append($row);
  }
  this.$container.append(this.$board);
};

$(function () {
  var game = new TickTackToe($('[data-container=game]'));
  game.draw();
});
