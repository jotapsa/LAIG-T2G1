/**
 * Move
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Move(startingPos, finalPos, player){
  //construtor
  this.startingPos = startingPos;
  this.finalPos = finalPos;
  this.turn = player || undefined;
  this.promotedPiece = false;
  this.capturedPiece = CELL.EMPTY_SQUARE; //same as none
};

Move.prototype.getTurn = function(){
  return this.turn;
}

Move.prototype.getStartingPos = function(){
  return this.startingPos;
}

Move.prototype.getFinalPos = function(){
  return this.finalPos;
}

Move.prototype.getPromotedPiece = function(){
  return this.promotedPiece;
}

Move.prototype.getCapturedPiece = function(){
  return this.capturedPiece;
}


Move.prototype.setCapturedPiece = function(piece){
  this.capturedPiece=piece;
}

Move.prototype.setPromotedPiece = function(bool){
  this.promotedPiece=bool;
}

//Is there a more "elegant" way to do this ?
Move.prototype.Equals = function(move){
  if (this.startingPos[0] == move.getStartingPos()[0] &&
  this.startingPos[1] == move.getStartingPos()[1] &&
  this.finalPos[0] == move.getFinalPos()[0] &&
  this.finalPos[1] == move.getFinalPos()[1]){
    return true;
  }

  return false;
}
