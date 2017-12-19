/**
 * Piece
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Piece(scene, colour){
	CGFobject.call(this,scene);

	this.cylinder = new Cylinder(this.scene, 0.2, 0.4, 0.4, 20, 20, 1, 1);
  this.colour = colour;

	this.whitePieceMaterial = new CGFappearance(this.scene);
	this.whitePieceMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	this.whitePieceMaterial.setSpecular(0.5, 0.5, 0.5, 1);
	this.whitePieceMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
	this.whitePieceMaterial.setShininess(1);
	this.whitePieceMaterial.loadTexture ("scenes/images/white_checker.jpg");

	this.blackPieceMaterial = new CGFappearance(this.scene);
	this.blackPieceMaterial.setAmbient(0.5, 0.5, 0.5,1);
	this.blackPieceMaterial.setSpecular(0.5, 0.5, 0.5,1);
	this.blackPieceMaterial.setDiffuse(0.5, 0.5, 0.5,1);
	this.blackPieceMaterial.setShininess(1);
	this.blackPieceMaterial.loadTexture("scenes/images/black_checker.jpg");

};

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor=Piece;

Piece.prototype.display = function () {
  this.scene.pushMatrix();
    if(this.colour == "black"){
      this.blackPieceMaterial.apply();
    }
    else if(this.colour == "white"){
      this.whitePieceMaterial.apply();
    }
    this.cylinder.display();
  this.scene.popMatrix();
};
