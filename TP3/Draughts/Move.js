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

  this.movesN = 0;
};

/**
* Return Move Starting position.
*/
Move.prototype.getStartingPos = function(){
  return this.startingPos;
}

/**
* Return Move Final position.
*/
Move.prototype.getFinalPos = function(){
  return this.finalPos;
}

/**
* Return Move Turn.
*/
Move.prototype.getTurn = function(){
  return this.turn;
}

/**
* Return Move Animation.
*/
Move.prototype.getAnimation = function(){
  return this.animation;
}

/**
* Return Move forcedMove.
*/
Move.prototype.isforcedMove = function(){
  return this.forcedMove;
}

/**
* Return Move promotedPiece.
*/
Move.prototype.getPromotedPiece = function(){
  return this.promotedPiece;
}

/**
* Return Move capturedPiece.
*/
Move.prototype.getCapturedPiece = function(){
  return this.capturedPiece;
}

/**
* Return Move movesN.
*/
Move.prototype.getMovesN = function(){
  return this.movesN;
}

/**
* Set Move forcedMove.
* @param {boolean} bool
*/
Move.prototype.setForcedMove = function(bool){
  this.forcedMove = bool;
}

/**
* Set Move capturedPiece.
* @param {number} piece
*/
Move.prototype.setCapturedPiece = function(piece){
  this.capturedPiece=piece;
}

/**
* Set Move promotedPiece.
* @param {boolean} bool
*/
Move.prototype.setPromotedPiece = function(bool){
  this.promotedPiece=bool;
}

/**
* Set Move movesN.
* @param {number} movesN
*/
Move.prototype.setMovesN = function(movesN){
  this.movesN = movesN;
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
