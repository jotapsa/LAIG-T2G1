var invalidSquare = -1;
var emptySquare = 0;
var whitePiece = 1;
var blackPiece = 2;

/**
 * DraughtLogic
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DraughtLogic(){
  //construtor
  this.board = new DraughtMap();
};

DraughtLogic.prototype.getsizeN = function(){
  return this.sizeN;
}
