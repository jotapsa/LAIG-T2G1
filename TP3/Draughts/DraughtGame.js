GAMESTATE = {
  WHITES_TURN: 1,
  BLACKS_TURN: 2,
  GAME_FINISHED: 3,
};

OWNER = {
  HUMAN: 0,
  CPU: 1,
}

DIFFICULTY = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
  IMPOSSIBLE: 3
}

THEME = {
    NORMAL: 0,
    LEGACY: 1,
};

/**
 * DraughtGame
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DraughtGame(){
  //construtor
  this.moves = [];
  this.whitesOwner = OWNER.HUMAN;
  this.blacksOwner = OWNER.HUMAN;
  this.gameState = GAMESTATE.BLACKS_TURN;
  this.difficulty = DIFFICULTY.HARD;

  this.board = new DraughtMap();
  this.IDGamma = [0, Math.pow(this.board.getsizeN(), 2) -1];

  //scoring variables
  this.player1Wins = 0;
  this.player2Wins = 0;
  this.computer1Wins = 0;
  this.computer2Wins = 0;

  this.whitePieces = 12;
  this.blackPieces = 12;

  if(this.whitesOwner == OWNER.HUMAN){
    this.whites = new Player("Whites");
  }
  else if(this.whitesOwner == OWNER.CPU){
    this.whites = new Computer("Whites", this.difficulty);
  }

  if(this.blacksOwner == OWNER.HUMAN){
    this.blacks = new Player("Blacks");
  }
  else if(this.blacksOwner == OWNER.CPU){
    this.blacks = new Computer("Blacks", this.difficulty);
  }
};

DraughtGame.prototype.getGameState = function(){
  return this.gameState;
}

DraughtGame.prototype.picked = function (id){
  let move;

  if (id < this.IDGamma[0] || id > this.IDGamma[1]){
    return;
  }

  switch(this.gameState){
    case GAMESTATE.WHITES_TURN:{
      move = this.whites.createMove(id, this.board);
    }
    break;
    case GAMESTATE.BLACKS_TURN:{
      move = this.blacks.createMove(id, this.board);
    }
    default:
    break;
  }

  //if valid move
  if (move && DraughtAux.checkValidMove(this, move, this.board)){
    this.moves.push(move);
    if(!this.whites.getselectLOCK() && !this.blacks.getselectLOCK()){
      this.nextTurn();
    }
    this.board.makeMove(move);
  }
  console.log(move);
}

DraughtGame.prototype.nextTurn = function(){
  switch(this.gameState){
    case (GAMESTATE.BLACKS_TURN):{
      this.gameState = GAMESTATE.WHITES_TURN;
    }
    break;
    case (GAMESTATE.WHITES_TURN):{
      this.gameState = GAMESTATE.BLACKS_TURN;
    }
    break;
    default:
    break;
  }
}

DraughtGame.prototype.undoMove = function(){
  //If we have made a move
  if(this.moves.length){
    let move;
    move = this.moves.pop();
    this.board.undoMove(move);
    this.gameState = move.getTurn();
    this.selectedPiece =false;
  }
}

DraughtGame.prototype.resetGame = function(){
  this.board.resetMap();

  this.selectedPiece = false;
  this.selectLOCK = false;
  this.startingPos = null;
  this.finalPos = null;

  //scoring variables
  this.whitePieces = 12;
  this.blackPieces = 12;
}
