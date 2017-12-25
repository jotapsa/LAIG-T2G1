/**
 * Computer
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Computer(piece, difficulty){
  //construtor
  this.piece = piece;
  this.difficulty= difficulty;
  this.wins = 0;
};

Computer.prototype.getWins = function(){
  return this.wins;
}
