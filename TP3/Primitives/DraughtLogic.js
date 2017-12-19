/**
 * DraughtLogic
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DraughtLogic(sizeN, pieces){
  //construtor
  this.sizeN = sizeN;
  this.map = new Array(this.sizeN).fill(new Array(this.sizeN).fill(0));
  this.pieces = pieces;
  this.whitePieces = pieces;
  this.blackPieces = pieces;
};
