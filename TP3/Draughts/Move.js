/**
 * Move
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Move(startingPos, finalPos, turn, forcedMove, promotedPiece, capturedPiece){
  //construtor
  this.startingPos = startingPos;
  this.finalPos = finalPos;
  this.turn = turn || undefined;

  this.CPoints = [];
  this.CPoints.push([0, 0, 0]);
  this.CPoints.push([0, 2, 0]);
  this.CPoints.push([this.finalPos[1]-this.startingPos[1], 2, this.finalPos[0]-this.startingPos[0]]);
  this.CPoints.push([this.finalPos[1]-this.startingPos[1], 0, this.finalPos[0]-this.startingPos[0]]);
  this.animation = new BezierAnimation(this.CPoints, 20);

  this.forcedMove = forcedMove || false;
  this.promotedPiece = promotedPiece || false;
  this.capturedPiece = capturedPiece || CELL.EMPTY_SQUARE; //same as none
};


Move.prototype.getStartingPos = function(){
  return this.startingPos;
}

Move.prototype.getFinalPos = function(){
  return this.finalPos;
}

Move.prototype.getTurn = function(){
  return this.turn;
}

Move.prototype.getAnimation = function(){
  return this.animation;
}

Move.prototype.isforcedMove = function(){
  return this.forcedMove;
}

Move.prototype.getPromotedPiece = function(){
  return this.promotedPiece;
}

Move.prototype.getCapturedPiece = function(){
  return this.capturedPiece;
}

Move.prototype.setForcedMove = function(bool){
  this.forcedMove = bool;
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
