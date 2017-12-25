/**
 * Player
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Player(piece){
  //construtor
  this.piece = piece;
  this.wins = 0;
};


Player.prototype.getWins = function(){
  return this.wins;
}

Player.prototype.picked = function(id){
  let move=null; //reset move everytime
  let y, x;
}
