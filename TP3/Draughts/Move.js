
/**
 * Move
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Move(startingPos, finalPos){
  //construtor
  this.startingPos = startingPos;
  this.finalPos = finalPos;
};

Move.prototype.getStartingPos = function(){
  return this.startingPos;
}

Move.prototype.getFinalPos = function(){
  return this.finalPos;
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