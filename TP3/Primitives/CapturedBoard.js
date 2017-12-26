/**
* CapturedBoard
* @param type {Type of pieces that are displayed}
* @constructor
*/
function CapturedBoard(scene, type){
	CGFobject.call(this,scene);

	this.sizeN = this.scene.game.board.getsizeN();
  this.pieces = type;

	this.cube= new UnitCube(this.scene);
	this.blackPiece = new Piece(this.scene, "black");
	this.whitePiece = new Piece(this.scene, "white");

	this.whiteMaterial = new CGFappearance(this.scene);
	this.whiteMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setSpecular(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
	this.whiteMaterial.setShininess(1);
	this.whiteMaterial.loadTexture ("scenes/images/white_marble.jpg");

	this.blackMaterial = new CGFappearance(this.scene);
	this.blackMaterial.setAmbient(0.5, 0.5, 0.5,1);
	this.blackMaterial.setSpecular(0.5, 0.5, 0.5,1);
	this.blackMaterial.setDiffuse(0.5, 0.5, 0.5,1);
	this.blackMaterial.setShininess(1);
	this.blackMaterial.loadTexture("scenes/images/black_marble.jpg");
};

CapturedBoard.prototype = Object.create(CGFobject.prototype);
CapturedBoard.prototype.constructor=CapturedBoard;

CapturedBoard.prototype.display = function (){
  this.scene.pushMatrix();
    this.cube.display();
  this.scene.popMatrix();
};
