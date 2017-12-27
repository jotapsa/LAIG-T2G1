/**
 * Player
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Player(piece){
  //construtor
  this.pieces = piece;
  this.wins = 0;

  this.selectedPiece = false;
  this.selectLOCK = false;
  this.startingPos = null;
  this.finalPos = null;
};

Player.prototype.getselectLOCK = function(){
  return this.selectLOCK;
}

Player.prototype.getWins = function(){
  return this.wins;
}

Player.prototype.createMove = function(id, board){
  let move=null; //reset move everytime
  let y, x;

  y = Math.floor(id / 8);
  x = id % 8;
  console.log("Y: " + y + " X: " + x);
  console.log(this.pieces + " selectLOCK: " + this.selectLOCK);

  switch (this.pieces) {
    case "Whites":{
      if((board.getPos(y,x) == CELL.WHITE_PIECE || board.getPos(y,x) == CELL.WHITE_KING) && !this.selectLOCK){
        this.startingPos = [y, x];
        this.selectedPiece = true;
      }
      else if (this.selectedPiece && board.getPos(y,x) == CELL.EMPTY_SQUARE){
        this.finalPos = [y, x];
        if(!this.selectLOCK){
          this.selectedPiece = false;
        }
        move = new Move(this.startingPos, this.finalPos, TURN.WHITES);
      }
    }
    break;
    case "Blacks":{
      if((board.getPos(y,x) == CELL.BLACK_PIECE || board.getPos(y,x) == CELL.BLACK_KING) && !this.selectLOCK){
        this.startingPos = [y, x];
        this.selectedPiece = true;
      }
      else if (this.selectedPiece && board.getPos(y,x) == CELL.EMPTY_SQUARE){
        this.finalPos = [y, x];
        if(!this.selectLOCK){
          this.selectedPiece = false;
        }
        move = new Move(this.startingPos, this.finalPos, TURN.BLACKS);
      }
    }
    break;
    default:
    break;

  }
  return move;
}

Player.prototype.forceConsecutiveMove = function(startingPos){
  this.startingPos = startingPos;
  this.selectedPiece = true;
  this.selectLOCK = true;
}


Player.prototype.toggleOFFselectLOCK = function(){
  this.selectLOCK = false;
}

Player.prototype.getSelectedPiecePos = function(){
  if(this.selectedPiece){
    return this.startingPos;
  }
  return null;
}
