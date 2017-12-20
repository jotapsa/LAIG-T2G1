
/**
 * Move
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Move(startingPos, finalPos){
  //construtor
  this.startingPos = startingPos;
  this.finalPos = finalPos;
  console.log(this.startingPos);
  console.log(this.finalPos);
};

Move.prototype.getStartingPos = function(){
  return this.startingPos;
}

Move.prototype.getFinalPos = function(){
  return this.finalPos;
}
