GAMESTATE = {
  WHITES_TURN: 0,
  BLACKS_TURN: 1,
  GAME_FINISHED: 2,
};

GAMEMODE = {
    HUMAN_VS_HUMAN: 0,
    HUMAN_VS_CPU: 1,
    CPU_VS_CPU: 2
};

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
  this.gameState = GAMESTATE.BLACKS_TURN;

  this.board = new DraughtMap();
  this.selectedPiece = false;
  this.selectLOCK = false;
  this.startingPos = null;
  this.finalPos = null;
};

DraughtGame.prototype.picked = function (id){
  let move=null; //reset move everytime
  let y, x;

  y = Math.floor(id / 8);
  x = id % 8;
  console.log("Y: " + y + " X: " + x);
  console.log("selectLOCK: " + this.selectLOCK);

  switch (this.gameState){
    case GAMESTATE.WHITES_TURN:{
      if((this.board.getPos(y,x) == CELL.WHITE_PIECE || this.board.getPos(y,x) == CELL.WHITE_KING) && !this.selectLOCK){
        this.startingPos = [y, x];
        this.selectedPiece = true;
      }
      else if (this.selectedPiece && this.board.getPos(y,x) == CELL.EMPTY_SQUARE){
        this.finalPos = [y, x];
        if(!this.selectLOCK){
          this.selecedPiece = false;
        }
        move = new Move(this.startingPos, this.finalPos);
      }
      //if valid move
      if (move && Human.checkValidMove(this, move, this.board)){
        this.moves.push(move);
        if(!this.selectLOCK){
          this.gameState = GAMESTATE.BLACKS_TURN;
        }
        this.board.makeMove(move);
      }
    }
    break;
    case GAMESTATE.BLACKS_TURN:{
      if((this.board.getPos(y,x) == CELL.BLACK_PIECE || this.board.getPos(y,x) == CELL.BLACK_KING) && !this.selectLOCK){
        this.startingPos = [y, x];
        this.selectedPiece = true;
      }
      else if (this.selectedPiece && this.board.getPos(y,x) == CELL.EMPTY_SQUARE){
        this.finalPos = [y, x];
        if(!this.selectLOCK){
          this.selecedPiece = false;
        }
        move = new Move(this.startingPos, this.finalPos);
      }
      //if valid move
      if (move && Human.checkValidMove(this, move, this.board)){
        this.moves.push(move);
        if(!this.selectLOCK){
          this.gameState = GAMESTATE.WHITES_TURN;
        }
        this.board.makeMove(move);
      }
    }
    break;
    case GAMESTATE.GAME_FINISHED:
    break;
    default:
    break;
  }
}

DraughtGame.prototype.forceConsecutiveMove = function(startingPos){
  this.startingPos = startingPos;
  this.selectedPiece = true;
  this.selectLOCK = true;
}

DraughtGame.prototype.toggleOFFselectLOCK = function(){
  this.selectLOCK = false;
}

DraughtGame.prototype.getPos = function(y, x){
  return this.board.getPos(y,x);
}

DraughtGame.prototype.getsizeN = function(){
  return this.board.getsizeN();
}
