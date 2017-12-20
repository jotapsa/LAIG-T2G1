
/**
 * Move
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Move(y1, x1, y2, x2){
  //construtor
  this.startingPos = [y1, x1];
  this.finalPos = [y2, x2];
};

Move.prototype.getStartingPos = function(){
  return this.startingPos;
}

Move.prototype.getFinalPos = function(){
  return this.finalPos;
}
