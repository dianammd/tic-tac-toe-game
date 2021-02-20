var mode = 1;
var turnCounter = -1;
var board = [
  ["1","4","7"],
  ["2","5","8"],
  ["3","6","9"]
];

//night-mode

$(".mode-btn").click(function() {
  mode++;
  if (mode%2 == 0) {
    document.body.style.backgroundColor = "#222831";
    $(".box").removeClass("box-light");
    $(".box").addClass("box-dark");
    $(".btn").removeClass("btn-outline-dark");
    $(".btn").addClass("btn-outline-light");
    $(".btn").html("<i class='fas fa-sun'></i>");

  } else {
    document.body.style.backgroundColor = "#dcd6f7";
    $(".box").removeClass("box-dark");
    $(".box").addClass("box-light");
    $(".btn").addClass("btn-outline-dark");
    $(".btn").removeClass("btn-outline-light");
    $(".btn").html("<i class='fas fa-moon'></i>");
  }

})

// turnos
function turn() {
  if (turnCounter%2 == 0) {
    $(".title").html("It's player 1's turn");
  } else {
    $(".title").html("It's player 2's turn");
  }
}

//reset Game
function reset() {
  mode = 1;
  board = [
    ["1","4","7"],
    ["2","5","8"],
    ["3","6","9"]
  ];
  $(".box-content").html("");
}

//check if someone won
function check(board,num) {
  if (turnCounter>=4) {
    if ((board[0][0] == board[0][1] && board[0][2] == board[0][0])
    || (board[1][0] == board[1][1] && board[1][2] == board[1][0])
    || (board[2][0] == board[2][1] && board[2][2] == board[2][0])
    || (board[0][0] == board[1][0] && board[1][0] == board[2][0])
    || (board[0][1] == board[1][1] && board[1][1] == board[2][1])
    || (board[0][2] == board[1][2] && board[1][2] == board[2][2])
    || (board[0][0] == board[1][1] && board[1][1] == board[2][2])) {
      $(".title").html("Game over, player " + num + " won! Press any key to play again.");
      turnCounter = -1;
    }
    else if (turnCounter == 9) {
      $(".title").html("It's a draw! Press any key to play again.");
      turnCounter = -1;
    }
  }
}

//register move on board
function makeMove(pos,player) {
  for(var i=0;i<board.length;i++) {
    for(var j =0;j<board[i].length;j++) {
      if (board[i][j] === pos) {
        board[i][j] = player;
        return 1;
      }
    }
  }
}

//start the game
$(document).on("keypress",function() {
  if (turnCounter == -1) {
    reset();
    $(".title").html("It's player 1's turn");
    turnCounter++;
  }
})


$(".box").click(function() {
  if (turnCounter > -1) {
    var userMove = String(this.id);
    var selectedBox = "box-content-" + userMove;
    turnCounter++;
    turn();
    if (turnCounter%2 != 0) {
      makeMove(userMove,"X");
      $("." + selectedBox).html("X");
      check(board,"1");
    }
    else {
      makeMove(userMove,"O");
      $("." + selectedBox).html("O");
      check(board,"2");
    }
  }
})
